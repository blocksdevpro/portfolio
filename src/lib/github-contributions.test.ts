import assert from "node:assert/strict";
import { test } from "node:test";
import { parseGitHubCalendar } from "./github-contributions";

const calendar = `
  <table><tr>
    <td class="ContributionCalendar-day" data-date="2026-09-10" id="c" data-level="4"></td>
    <td class="ContributionCalendar-day" data-date="2026-09-08" id="a" data-level="0"></td>
    <td class="ContributionCalendar-day" data-date="2026-09-09" id="b" data-level="1"></td>
  </tr></table>
  <tool-tip for="b">1 contribution on September 9th.</tool-tip>
  <tool-tip for="c">1,234 contributions on September 10th.</tool-tip>
  <tool-tip for="a">No contributions on September 8th.</tool-tip>
`;

test("joins tooltips by cell id and sorts GitHub's weekday-ordered cells", () => {
  assert.deepEqual(parseGitHubCalendar(calendar), {
    kind: "ready",
    total: 1235,
    days: [
      { date: "2026-09-08", level: 0, count: 0 },
      { date: "2026-09-09", level: 1, count: 1 },
      { date: "2026-09-10", level: 4, count: 1234 },
    ],
  });
});

test("rejects missing or changed markup rather than reporting zero contributions", () => {
  for (const html of [
    "<html>Sign in</html>",
    calendar.replace('for="a"', 'for="missing"'),
    calendar.replace("No contributions", "Unknown contributions"),
    calendar.replace('data-level="4"', 'data-level="5"'),
    calendar.replace('data-date="2026-09-10"', 'data-date="2026-09-11"'),
    calendar.replace('data-date="2026-09-10"', 'data-date="2026-09-09"'),
  ]) {
    assert.deepEqual(parseGitHubCalendar(html), { kind: "unavailable" });
  }
});
