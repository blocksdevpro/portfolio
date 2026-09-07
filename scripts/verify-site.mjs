import assert from "node:assert/strict";

const base = process.env.SITE_URL || "http://localhost:3000";
const response = await fetch(base, { signal: AbortSignal.timeout(30_000) });
assert.equal(response.status, 200, "Homepage must render successfully");
const html = await response.text();
for (const text of [
  "Uttam Kumbhakar",
  "Selected work",
  "Calorine API",
  "Boris",
  "Skip to content",
  "application/ld+json",
])
  assert.ok(html.includes(text), "Missing rendered content: " + text);
for (const url of [
  "https://boris.blocksdev.pro",
  "https://calorine.in",
  "mailto:mail@blocksdev.pro",
])
  assert.ok(
    html.includes('href="' + url + '"'),
    "Missing working link: " + url,
  );
const ids = new Set(
  [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
);
for (const [, hash] of html.matchAll(/href="#([^"]+)"/g))
  assert.ok(ids.has(hash), "Unresolved anchor: #" + hash);
const main = html.slice(html.indexOf("<main"));
assert.ok(
  main.indexOf('id="projects"') < main.indexOf('id="experience"'),
  "Selected work must precede experience",
);
assert.ok(
  main.indexOf('id="projects"') < main.indexOf('id="about"'),
  "Selected work must precede About",
);
assert.equal(
  (html.match(/<details\b/g) || []).length,
  2,
  "Both projects must expose engineering details",
);
console.log(
  "Homepage, live project links, metadata, section order, disclosures, and anchors passed.",
);

const resources = [
  ["/portrait.webp", "image/webp"],
  ["/icon.svg", "image/svg+xml"],
  ["/opengraph-image", "image/png"],
  ["/sitemap.xml", "xml"],
  ["/robots.txt", "text/plain"],
];
await Promise.all(
  resources.map(async ([path, type]) => {
    const result = await fetch(new URL(path, base), {
      signal: AbortSignal.timeout(30_000),
    });
    assert.equal(result.status, 200, path + " must load");
    assert.ok(
      result.headers.get("content-type")?.includes(type),
      "Incorrect content type for " + path,
    );
    assert.ok(
      (await result.arrayBuffer()).byteLength > 0,
      path + " must not be empty",
    );
  }),
);
console.log(
  "Portrait, favicon, social card, sitemap, and robots routes passed.",
);

for (const path of ["/api/contributions", "/api/spotify"]) {
  const result = await fetch(new URL(path, base), {
    signal: AbortSignal.timeout(15_000),
  });
  const data = await result.json();
  assert.ok(
    result.status === 200 || result.status === 502,
    "Unexpected integration status",
  );
  const kind = Array.isArray(data.contributions) ? "contributions" : data.kind;
  assert.ok(
    ["contributions", "track", "idle", "unavailable"].includes(kind),
    "Invalid widget response",
  );
  if (result.status === 502) assert.equal(kind, "unavailable");
  console.log(path + ": " + kind + " (HTTP " + result.status + ")");
}
console.log(
  "HTTP checks passed. Visual rendering and browser interaction checks are separate.",
);
