import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.SITE_URL || "http://localhost:3100";
const out = "docs/phase-2/implementation";
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
for (const [width, theme] of [
  [1280, "light"],
  [390, "dark"],
]) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    colorScheme: theme,
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("button", { name: "Open command menu" }).waitFor();
  await page.screenshot({
    animations: "disabled",
    path: `${out}/${width}-${theme}-hero.png`,
  });
  const overlays = await page.addStyleTag({
    content: ".site-header,.skip-link{visibility:hidden}",
  });
  await page
    .locator(".project-entry")
    .first()
    .screenshot({
      animations: "disabled",
      path: `${out}/${width}-${theme}-boris.png`,
    });
  await page
    .locator(".project-entry")
    .nth(1)
    .screenshot({
      animations: "disabled",
      path: `${out}/${width}-${theme}-calorine.png`,
    });
  await page.locator("summary").first().click();
  await page
    .locator("details")
    .first()
    .screenshot({
      animations: "disabled",
      path: `${out}/${width}-${theme}-details.png`,
    });
  await overlays.evaluate((el) => el.remove());
  await page.getByRole("button", { name: "Open command menu" }).click();
  await page.getByRole("combobox").fill("theme");
  await page
    .getByRole("dialog")
    .screenshot({
      animations: "disabled",
      path: `${out}/${width}-${theme}-search.png`,
    });
  await page.keyboard.press("Escape");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Copy email address" }).click();
  await page
    .locator("#contact")
    .screenshot({
      animations: "disabled",
      path: `${out}/${width}-${theme}-contact.png`,
    });
  await page
    .locator("#activity")
    .screenshot({
      animations: "disabled",
      path: `${out}/${width}-${theme}-activity.png`,
    });
  await context.close();
}
const response = await fetch(base + "/opengraph-image");
await writeFile(
  out + "/social-card.png",
  Buffer.from(await response.arrayBuffer()),
);
await browser.close();
