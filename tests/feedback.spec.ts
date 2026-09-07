import { expect, test } from "@playwright/test";

test("loading reserves activity space until a failed response", async ({
  page,
}) => {
  let finish: (() => void) | undefined;
  const gate = new Promise<void>((resolve) => {
    finish = resolve;
  });
  await page.route("**/api/contributions", async (route) => {
    await gate;
    await route.fulfill({ status: 503, json: { error: "Unavailable" } });
  });
  await page.route("**/api/spotify", (route) =>
    route.fulfill({ json: { kind: "idle" } }),
  );
  await page.goto("/");
  await expect(page.locator("#activity")).toContainText(
    "Loading GitHub activity",
  );
  const height = await page
    .locator(".activity-body")
    .evaluate((el) => el.clientHeight);
  finish?.();
  await expect(page.locator("#activity")).toContainText(
    "temporarily unavailable",
  );
  expect(
    await page.locator(".activity-body").evaluate((el) => el.clientHeight),
  ).toBe(height);
});

test("pointer light stops on exit and remains static with reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const artwork = page.locator(".brand-illustration");
  await artwork.hover();
  await expect(artwork).toHaveAttribute("data-lit", "true");
  await page.mouse.move(0, 0);
  await expect(artwork).toHaveAttribute("data-lit", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await artwork.hover();
  await expect(artwork).toHaveAttribute("data-lit", "false");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await artwork.hover();
  await expect(artwork).toHaveAttribute("data-lit", "true");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(artwork).toHaveAttribute("data-lit", "false");
});

test("touch controls and 200 percent CSS zoom preserve reading", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(process.env.SITE_URL || "http://localhost:3000");
  await page.getByRole("button", { name: "Open command menu" }).tap();
  await page.getByRole("combobox").fill("projects");
  await page.getByRole("option").tap();
  await expect(page).toHaveURL(/#projects$/);
  await page.locator("summary").first().tap();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.screenshot({ path: testInfo.outputPath("touch-details.png") });
  await context.close();

  const desktop = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });
  await desktop.goto(process.env.SITE_URL || "http://localhost:3000");
  await desktop.addStyleTag({ content: "html { zoom: 2; }" });
  expect(
    await desktop.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await desktop.getByRole("button", { name: "Open command menu" }).click();
  await expect(desktop.getByRole("combobox")).toBeVisible();
  await desktop.screenshot({ path: testInfo.outputPath("zoom.png") });
  await desktop.close();
});

test("closing the menu invalidates an unfinished clipboard attempt", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () =>
          new Promise<void>((resolve) =>
            window.addEventListener("finish-copy", () => resolve(), {
              once: true,
            }),
          ),
      },
    });
  });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open command menu" });
  await trigger.click();
  await page.getByRole("combobox").fill("copy email");
  await page.getByRole("combobox").press("Enter");
  await page.getByRole("combobox").press("Escape");
  await trigger.click();
  await page.getByRole("combobox").fill("copy email");
  await page.evaluate(() => dispatchEvent(new Event("finish-copy")));
  await expect(page.getByRole("option")).toContainText("Copy email");
  await expect(page.getByRole("dialog").getByRole("status")).toBeEmpty();
});
