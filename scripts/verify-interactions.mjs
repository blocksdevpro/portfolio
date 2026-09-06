import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Execute the actual pure modules. Browser layout and focus trapping need the
// separate browser review; these tests cover navigation and network boundaries.
async function loadModule(path, globals = {}) {
  const source = await readFile(path, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const context = vm.createContext({ exports: {}, URL, ...globals });
  new vm.Script(outputText, { filename: path }).runInContext(context);
  return context.exports;
}

const { parseContributions, parseLastFm, parseMusic } = await loadModule(
  "src/lib/widget-data.ts",
);

test("contributions retain real zero values", () => {
  const result = parseContributions({
    contributions: [{ date: "2026-09-01", count: 0, level: 0 }],
  });
  assert.equal(result.kind, "ready");
  assert.equal(result.total, 0);
});

test("unavailable contributions never become a zero total", () => {
  for (const value of [
    null,
    {},
    { error: "Rate limited" },
    { contributions: [null] },
  ]) {
    const result = parseContributions(value);
    assert.equal(result.kind, "unavailable");
    assert.equal("total" in result, false);
  }
});

test("malformed dates, levels, and counts are rejected", () => {
  for (const day of [
    { date: "2026-02-30", count: 1, level: 1 },
    { date: "2026-09-01", count: -1, level: 0 },
    { date: "2026-09-01", count: 2.5, level: 1 },
    { date: "2026-09-01", count: 1, level: 5 },
  ])
    assert.equal(
      parseContributions({ contributions: [day] }).kind,
      "unavailable",
    );
});

test("activity preserves calendar alignment across DST", () => {
  const result = parseContributions({
    contributions: [
      { date: "2026-03-09", count: 3, level: 2 },
      { date: "2026-03-07", count: 1, level: 1 },
      { date: "2026-03-08", count: 2, level: 1 },
    ],
  });
  assert.equal(result.kind, "ready");
  assert.equal(result.total, 6);
  assert.equal(result.days[0].date, "2026-03-07");
});

test("duplicate or missing days cannot silently shift the graph", () => {
  const first = { date: "2026-09-01", count: 1, level: 1 };
  assert.equal(
    parseContributions({ contributions: [first, first] }).kind,
    "unavailable",
  );
  assert.equal(
    parseContributions({
      contributions: [first, { ...first, date: "2026-09-03" }],
    }).kind,
    "unavailable",
  );
});

test("valid empty history differs from a failed request", () => {
  const result = parseContributions({ contributions: [] });
  assert.equal(result.kind, "ready");
  assert.equal(result.days.length, 0);
});

test("music distinguishes idle, failure, and playback", () => {
  assert.equal(parseLastFm({ recenttracks: { track: [] } }).kind, "idle");
  assert.equal(parseLastFm({ error: 6 }).kind, "unavailable");
  const result = parseLastFm({
    recenttracks: {
      track: [
        {
          name: "A song",
          artist: { "#text": "An artist" },
          "@attr": { nowplaying: "true" },
          image: [],
        },
      ],
    },
  });
  assert.equal(result.kind, "track");
  assert.equal(result.isPlaying, true);
  assert.equal(
    result.trackUrl,
    "https://open.spotify.com/search/A%20song%20An%20artist",
  );
  assert.equal(result.albumArt, null);
});

test("untrusted media and navigation schemes are rejected", () => {
  const track = {
    kind: "track",
    title: "Song",
    artist: "Artist",
    isPlaying: false,
    albumArt: "javascript:alert(1)",
    trackUrl: "https://open.spotify.com/search/song",
  };
  assert.equal(parseMusic(track).albumArt, null);
  assert.equal(
    parseMusic({ ...track, trackUrl: "javascript:alert(1)" }).kind,
    "unavailable",
  );
});

async function navigationFixture({
  reducedMotion = false,
  exists = true,
  hash = "",
} = {}) {
  const calls = [];
  const target = {
    getBoundingClientRect: () => ({ top: 300 }),
    setAttribute: (...args) => calls.push(["attribute", ...args]),
    focus: (options) => calls.push(["focus", options.preventScroll]),
  };
  const navigationModule = await loadModule("src/lib/scroll-to-section.ts", {
    document: {
      documentElement: {},
      getElementById: () => (exists ? target : null),
    },
    window: {
      scrollY: 600,
      location: { hash },
      matchMedia: () => ({ matches: reducedMotion }),
      getComputedStyle: () => ({ scrollPaddingTop: "80px" }),
      history: {
        pushState: (_state, _title, nextHash) =>
          calls.push(["history", nextHash]),
      },
      scrollTo: (options) =>
        calls.push(["scroll", options.top, options.behavior]),
    },
  });
  return { navigate: navigationModule.scrollToSection, calls };
}

test("section navigation clears the sticky header and transfers focus", async () => {
  const { navigate, calls } = await navigationFixture();
  assert.equal(navigate("#projects"), true);
  assert.deepEqual(calls, [
    ["history", "#projects"],
    ["attribute", "tabindex", "-1"],
    ["focus", true],
    ["scroll", 820, "smooth"],
  ]);
});

test("reduced motion uses instant navigation", async () => {
  const { navigate, calls } = await navigationFixture({ reducedMotion: true });
  navigate("#about");
  assert.deepEqual(calls.at(-1), ["scroll", 820, "auto"]);
});

test("missing anchors leave history, focus, and scroll alone", async () => {
  const { navigate, calls } = await navigationFixture({ exists: false });
  assert.equal(navigate("#missing"), false);
  assert.equal(calls.length, 0);
});

test("reselecting a section does not create duplicate history", async () => {
  const { navigate, calls } = await navigationFixture({ hash: "#projects" });
  navigate("#projects");
  assert.equal(
    calls.some((call) => call[0] === "history"),
    false,
  );
});

test("back to top scrolls to the start", async () => {
  const { navigate, calls } = await navigationFixture();
  navigate("#top");
  assert.deepEqual(calls.at(-1), ["scroll", 0, "smooth"]);
});
