import { expect, test } from "@playwright/test";

test.use({ reducedMotion: "no-preference" });

test.beforeEach(async ({ page }) => { await page.goto("/"); });

test("major sections fade in and slide up as they enter the viewport", async ({ page }) => {
  await expect(page.locator("html")).toHaveClass(/reveal-ready/);
  for (const id of ["services", "animals", "quote", "contact"]) {
    const section = page.locator(`#${id}`);
    await expect(section).not.toHaveClass(/is-revealed/);
    await expect(section).toHaveCSS("opacity", "0");
    await expect(section).toHaveCSS("transition-duration", "0.7s, 0.7s");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toHaveClass(/is-revealed/);
    await expect(section).toHaveCSS("opacity", "1");
  }
});

test("the hero image drifts slowly and the flight paths animate continuously", async ({ page }) => {
  const photo = page.locator(".tarmac-photograph img");
  await expect(photo).toHaveCSS("animation-name", "slow-drift");
  await expect(photo).toHaveCSS("animation-duration", "30s");
  await expect(photo).toHaveCSS("animation-direction", "alternate");
  await expect(photo).toHaveCSS("animation-iteration-count", "infinite");
  await expect(page.locator(".tarmac-route-line").first()).toHaveCSS("animation-name", "b-route, route-glow");
});

test("buttons and cards use 300ms design-system hover transitions", async ({ page }) => {
  const quote = page.locator(".tarmac-cta .button-gold");
  await expect(quote).toHaveCSS("transition-duration", "0.3s");
  await expect(quote).toHaveCSS("transition-timing-function", "cubic-bezier(0.4, 0, 0.2, 1)");
  await quote.hover();
  await expect.poll(() => quote.evaluate((el) => getComputedStyle(el).transform)).toBe("matrix(1.05, 0, 0, 1.05, 0, 0)");

  const whatsapp = page.locator(".tarmac-cta .button-outline");
  await whatsapp.hover();
  await expect(whatsapp).toHaveCSS("border-color", "rgb(255, 255, 255)");
  await expect(whatsapp).toHaveCSS("background-color", "rgba(255, 255, 255, 0.08)");

  const badge = page.locator(".tarmac-standards > span").first();
  await badge.hover();
  await expect.poll(() => badge.evaluate((el) => getComputedStyle(el).transform)).toBe("matrix(1, 0, 0, 1, 0, -4)");

  const dog = page.getByRole("link", { name: "Get a quote for dogs", exact: true });
  await dog.scrollIntoViewIfNeeded();
  await expect(dog).toHaveCSS("transition-duration", "0.3s");
  await dog.hover();
  await expect.poll(() => dog.evaluate((el) => getComputedStyle(el).transform)).toBe("matrix(1, 0, 0, 1, 0, -4)");
  await expect(dog).not.toHaveCSS("box-shadow", "none");
});

test("gallery selection still glides to and preselects the calculator", async ({ page }) => {
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "smooth");
  const goats = page.getByRole("link", { name: "Get a quote for goats", exact: true });
  await goats.scrollIntoViewIfNeeded();
  await goats.click();
  await expect(page.locator("#quote-animal")).toHaveValue("goat");
  await expect(page.locator("#quote-heading")).toBeInViewport();
  await expect(page.locator("#quote")).toHaveCSS("opacity", "1");
});
