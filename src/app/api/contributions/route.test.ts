import assert from "node:assert/strict";
import { test } from "node:test";
import { GET } from "./route";

const calendar = `<table><tr><td class="ContributionCalendar-day"
  data-date="2026-09-10" id="day" data-level="1"></td></tr></table>
  <tool-tip for="day">2 contributions on September 10th.</tool-tip>`;
const payload = {
  contributions: [{ date: "2026-09-10", count: 2, level: 1 }],
};

test("route handles direct GitHub success, upstream failures, and fallback exhaustion", async () => {
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const warnings: unknown[][] = [];
  console.warn = (...args: unknown[]) => {
    warnings.push(args);
  };
  try {
    for (const failure of [
      "none",
      "timeout",
      "http",
      "markup",
      "json",
      "empty",
      "both",
    ]) {
      const requests: string[] = [];
      globalThis.fetch = async (input, init) => {
        const url = String(input);
        requests.push(url);
        assert.ok(init?.signal);
        if (url.startsWith("https://github.com/")) {
          if (failure === "none") return new Response(calendar);
          if (failure === "http")
            return new Response("Rate limited", { status: 429 });
          if (failure === "markup")
            return new Response("<html>Changed calendar</html>");
          throw new DOMException("Request timed out", "TimeoutError");
        }
        assert.ok(
          url.startsWith("https://github-contributions-api.jogruber.de/"),
        );
        if (failure === "both") throw new TypeError("fetch failed");
        if (failure === "json") return new Response("invalid JSON");
        if (failure === "empty") return Response.json({ contributions: [] });
        return Response.json(payload);
      };
      const response = await GET();
      const unavailable = ["both", "json", "empty"].includes(failure);
      assert.equal(response.status, unavailable ? 502 : 200, failure);
      assert.deepEqual(
        await response.json(),
        unavailable ? { kind: "unavailable" } : payload,
      );
      assert.equal(requests.length, failure === "none" ? 1 : 2);
      assert.equal(
        response.headers.get("Cache-Control"),
        unavailable
          ? "no-store"
          : "public, s-maxage=3600, stale-while-revalidate=86400",
      );
    }
    assert.ok(warnings.length > 0);
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
  }
});
