import { expect, test } from "@playwright/test";

test("rapid theme clicks are preserved and finish cleanly", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("crash", () => errors.push("Page crashed"));
  await page.emulateMedia({ reducedMotion: "no-preference", colorScheme: "light" });
  await page.route("**/api/contributions", (route) =>
    route.fulfill({ status: 503, json: { error: "Unavailable" } }),
  );
  await page.route("**/api/spotify", (route) =>
    route.fulfill({ json: { kind: "idle" } }),
  );
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle color theme" });
  await expect(toggle).toBeVisible();

  const initialTheme = await page.locator("html").getAttribute("class");

  await toggle.evaluate((button) => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  await expect.poll(async () => ({
    theme: await page.locator("html").getAttribute("class"),
    transitioning: await page.locator("html").getAttribute("data-theme-transitioning"),
  })).toEqual({ theme: initialTheme, transitioning: null });

  await toggle.evaluate((button) => {
    for (let click = 0; click < 151; click++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  await expect.poll(async () => ({
    theme: await page.locator("html").getAttribute("class"),
    transitioning: await page.locator("html").getAttribute("data-theme-transitioning"),
  })).toEqual({
    theme: initialTheme === "dark" ? "light" : "dark",
    transitioning: null,
  });
  await expect.poll(() => page.locator("html").evaluate((root) =>
    root.getAnimations().filter((animation) => animation.effect?.getTiming().fill === "both").length,
  )).toBe(0);
  expect(errors).toEqual([]);
});
