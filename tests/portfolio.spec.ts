import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const contributions = Array.from({ length: 365 }, (_, index) => ({
  date: new Date(Date.UTC(2025, 8, 7 + index)).toISOString().slice(0, 10),
  count: index % 5,
  level: index % 5,
}));

async function widgets(
  page: Page,
  activity: unknown = { contributions },
  music: unknown = { kind: "idle" },
) {
  await page.route("**/api/contributions", (route) =>
    route.fulfill({ json: activity }),
  );
  await page.route("**/api/spotify", (route) => route.fulfill({ json: music }));
}

async function command(page: Page, query: string) {
  await page.getByRole("button", { name: "Open command menu" }).click();
  const input = page.getByRole("combobox");
  await expect(input).toBeFocused();
  await input.fill(query);
  return input;
}

for (const width of [360, 390, 768, 1280, 1440]) {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`${width}px ${colorScheme}: layout, disclosures, accessibility`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      await widgets(page);
      await page.goto("/");
      await expect(
        page.getByRole("region", { name: /Contribution graph/ }),
      ).toBeVisible();
      await expect(page.locator("html")).toHaveClass(new RegExp(colorScheme));
      const artwork = await page.locator("#brand-geometry").boundingBox();
      const cover = await page.locator(".brand-illustration").boundingBox();
      const name = await page.locator(".hero-name").boundingBox();
      expect(artwork).not.toBeNull();
      expect(cover).not.toBeNull();
      expect(name).not.toBeNull();
      if (artwork && cover && name) {
        expect(artwork.x).toBeGreaterThanOrEqual(cover.x);
        expect(artwork.x + artwork.width).toBeLessThanOrEqual(cover.x + cover.width);
        expect(artwork.y).toBeGreaterThanOrEqual(cover.y);
        expect(artwork.y + artwork.height).toBeLessThanOrEqual(name.y);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: testInfo.outputPath("page.png"),
        fullPage: true,
      });
      await page.locator("summary").first().click();
      await expect(page.locator("details").first()).toHaveAttribute("open", "");
      await page
        .locator("#projects")
        .screenshot({ path: testInfo.outputPath("work-expanded.png") });
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
    });
  }
}

test("search, keyboard, focus return, empty results and contextual actions", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await widgets(page);
  await page.goto("/");
  const input = await command(page, "");
  const panel = page.getByRole("dialog");
  const initialHeight = (await panel.boundingBox())?.height;
  await input.fill("no-such-action");
  await expect(panel).toContainText("No matching action");
  expect((await panel.boundingBox())?.height).toBe(initialHeight);
  await input.press("Enter");
  await expect(panel).toBeVisible();
  await input.fill("theme");
  await expect(page.getByRole("option")).toHaveCount(3);
  await expect(panel).toContainText("Enter to apply");
  await input.press("ArrowDown");
  await expect(page.getByRole("option").nth(1)).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await input.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close command menu" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(input).toBeFocused();
  await input.press("Escape");
  await expect(panel).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Open command menu" }),
  ).toBeFocused();
  await page.keyboard.press("Control+k");
  await expect(input).toBeFocused();
  await page.mouse.click(5, 5);
  await expect(panel).toBeHidden();
});

test("navigation preserves hashes, sticky clearance and history", async ({
  page,
}) => {
  await widgets(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#projects");
  await expect(page.locator("#projects")).toBeInViewport();
  const input = await command(page, "about");
  await input.press("Enter");
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator("#about")).toBeFocused();
  expect((await page.locator("#about").boundingBox())?.y).toBeGreaterThan(60);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await page.goBack();
  await expect(page).toHaveURL(/#about$/);
  await page.goForward();
  await expect(page).toHaveURL(/#contact$/);
  await page.reload();
  await expect(page.locator("#contact")).toBeInViewport();
});

test("theme preferences persist and system follows appearance", async ({
  page,
}) => {
  await widgets(page);
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/");
  for (const preference of ["dark", "light", "system"]) {
    const input = await command(page, `Use ${preference} theme`);
    await input.press("Enter");
    await page.reload();
    await expect(page.locator("html")).toHaveClass(
      preference === "dark" ? /dark/ : /light/,
    );
  }
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("copy success has stable geometry and restarts its reset timer", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await widgets(page);
  await page.goto("/#contact");
  const button = page.locator(".copy-control button");
  await button.scrollIntoViewIfNeeded();
  const before = await button.boundingBox();
  await button.click();
  await expect(page.locator(".copy-control [role=status]")).toHaveText(
    "Copied to clipboard",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "mail@blocksdev.pro",
  );
  expect(await button.boundingBox()).toEqual(before);
  await page.clock.install();
  await button.click();
  await page.clock.runFor(1500);
  await button.click();
  await page.clock.runFor(700);
  await expect(button).toHaveAttribute("data-state", "copied");
  await page.clock.runFor(1400);
  await expect(button).toHaveAttribute("data-state", "idle");
});

test("denied clipboard stays honest in contact and command menu", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("Denied")) },
    }),
  );
  await widgets(page);
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.locator(".copy-control [role=status]")).toContainText(
    "Select the email",
  );
  await expect(page.locator("#contact a[href^='mailto:']")).toBeVisible();
  const input = await command(page, "copy email");
  await input.press("Enter");
  await expect(page.getByRole("option")).toContainText("Copy failed");
  await expect(page.getByRole("dialog").getByRole("status")).toContainText(
    "Copy failed",
  );
  await input.press("Escape");
  await command(page, "copy email");
  await expect(page.getByRole("option")).toContainText("Copy email");
});

test("contribution tooltips show each day's actual count and date", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await widgets(page);
  await page.goto("/#activity");
  const zero = page.getByRole("button", { name: "0 contributions on 7 Sept 2025", exact: true });
  await zero.hover();
  await expect(page.getByRole("tooltip")).toContainText("0 contributions");
  await expect(page.getByRole("tooltip")).toContainText("7 Sept 2025");
  await expect(page.locator(".activity-tooltip")).toHaveCSS("background-color", "rgb(18, 18, 20)");
  await expect(page.locator(".activity-tooltip")).toHaveCSS("opacity", "1");
  const one = page.getByRole("button", { name: "1 contribution on 8 Sept 2025", exact: true });
  await one.hover();
  await expect(page.getByRole("tooltip")).toContainText("1 contribution");
  await expect(page.getByRole("tooltip")).toContainText("8 Sept 2025");
  await page.screenshot({ path: testInfo.outputPath("contribution-tooltip.png") });
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  await zero.focus();
  await zero.press("End");
  const last = page.getByRole("button", { name: "4 contributions on 6 Sept 2026", exact: true });
  await expect(last).toBeFocused();
  await expect(page.getByRole("tooltip")).toContainText("6 Sept 2026");
  await last.press("ArrowUp");
  await expect(page.getByRole("tooltip")).toContainText("3 contributions");
  await expect(page.getByRole("tooltip")).toContainText("5 Sept 2026");
});

test("contribution tooltips open on touch and stay within the viewport", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true, colorScheme: "light" });
  const page = await context.newPage();
  await widgets(page);
  await page.goto(process.env.SITE_URL || "http://localhost:3000");
  const last = page.getByRole("button", { name: "4 contributions on 6 Sept 2026", exact: true });
  await last.tap();
  await expect(page.getByRole("tooltip")).toContainText("4 contributions");
  await expect(page.locator(".activity-tooltip")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  const bounds = await page.locator(".activity-tooltip").boundingBox();
  expect(bounds).not.toBeNull();
  if (bounds) {
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(360);
  }
  await page.getByRole("heading", { name: "A little about me" }).tap();
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  await context.close();
});

test("activity scrolls with the keyboard and long music wraps", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await widgets(
    page,
    { contributions },
    {
      kind: "track",
      title:
        "A very long song title that should wrap comfortably across several lines",
      artist: "An artist with an unusually long name",
      albumArt: null,
      trackUrl: "https://open.spotify.com/search/test",
      isPlaying: true,
    },
  );
  await page.goto("/#activity");
  const graph = page.getByRole("region", { name: /Contribution graph/ });
  await expect(graph).toBeVisible();
  await expect(page.getByRole("slider")).toHaveCount(0);
  await expect.poll(() => graph.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  const initialScroll = await graph.evaluate((el) => el.scrollLeft);
  await graph.focus();
  await graph.press("ArrowLeft");
  await expect
    .poll(() =>
      graph.evaluate((el) => el.scrollLeft),
    )
    .toBeLessThan(initialScroll);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".music-equalizer i")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

for (const state of ["empty", "malformed", "failed"] as const) {
  test(`widgets expose ${state} state`, async ({ page }) => {
    if (state === "failed") {
      await page.route("**/api/*", (route) => route.abort());
    } else
      await widgets(
        page,
        state === "empty" ? { contributions: [] } : { unexpected: true },
        state === "empty" ? { kind: "idle" } : { unexpected: true },
      );
    await page.goto("/");
    await expect(page.locator("#activity")).toContainText(
      state === "empty" ? "No contribution history" : "temporarily unavailable",
    );
    await expect(page.locator(".music-widget")).toContainText(
      state === "empty" ? "Nothing on the turntable" : "unavailable",
    );
    await expect(page.locator(".activity-summary")).toHaveCount(0);
  });
}

test("essential reading and disclosures work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(process.env.SITE_URL || "http://localhost:3000");
  await expect(
    page.getByRole("heading", { name: "Uttam Kumbhakar", exact: true }),
  ).toBeVisible();
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await expect(
    page.getByRole("link", { name: "View contribution history on GitHub" }),
  ).toBeVisible();
  await context.close();
});
