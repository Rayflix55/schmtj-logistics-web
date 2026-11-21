import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/"); });

test("Option B restores the centred headline, parked A380, and original gold routes", async ({ page }) => {
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("#top")).toHaveAttribute("data-design", "option-b-a380");
  await expect(page.locator("h1")).toContainText("Your Trusted Partner");
  await expect(page.locator("h1")).toContainText("& Live Animal Export.");
  await expect(page.locator("h1")).toHaveCSS("text-align", "center");
  await expect(page.locator("h1")).toHaveCSS("font-size", "112px");
  await expect(page.locator("h1")).toHaveCSS("font-weight", "500");
  await expect(page.locator("#services-heading")).toHaveCSS("font-size", "48px");
  await expect(page.locator(".tarmac-stats")).toHaveCSS("border-radius", "20px");
  await expect(page.locator(".tarmac-cta .button-gold")).toHaveCSS("background-color", "rgb(255, 193, 7)");
  await expect(page.locator(".tarmac-route-line")).toHaveCount(3);
  await expect(page.locator(".tarmac-photograph img")).toHaveAttribute("src", "/images/a380-tarmac.webp");
  expect(await page.locator(".tarmac-photograph img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth === 2200)).toBe(true);
  expect(await page.evaluate(() => document.fonts.check("500 16px Manrope"))).toBe(true);
});

test("every gallery species scrolls to and selects its own estimate", async ({ page }) => {
  for (const [name, id] of [["dogs", "dog"], ["cats", "cat"], ["goats", "goat"], ["poultry", "poultry"], ["african parrots", "parrot"]]) {
    await page.getByRole("link", { name: `Get a quote for ${name}`, exact: true }).click();
    await expect(page).toHaveURL(/#quote$/);
    await expect(page.getByLabel("Select Animal", { exact: true })).toHaveValue(id);
    await expect(page.locator("#quote-heading")).toBeInViewport();
  }
});

test("pricing changes with country, weight, species, and optional services", async ({ page }) => {
  await page.locator("#quote-animal").selectOption("parrot");
  await page.locator("#quote-country").selectOption("3");
  await page.getByLabel("Approximate Weight", { exact: true }).fill("3.5");
  await expect(page.locator(".estimate-result")).toContainText("$1,442 - $1,702");
  await page.getByRole("checkbox", { name: "Travel crate" }).uncheck();
  await page.getByRole("checkbox", { name: "Vet & document support" }).uncheck();
  await expect(page.locator(".estimate-result")).toContainText("$1,112 - $1,312");
  const quoteUrl = new URL((await page.locator("#confirm-quote").getAttribute("href"))!);
  expect(quoteUrl.host).toBe("wa.me");
  for (const text of ["African parrot", "Dubai", "3.5 kg", "I have a crate", "Not included", "$1,112 to $1,312"]) expect(quoteUrl.searchParams.get("text")).toContain(text);
  await page.locator("#quote-weight").fill("0");
  await expect(page.getByRole("button", { name: "Confirm Exact Price on WhatsApp" })).toBeDisabled();
  await page.getByLabel("Adjust weight in kilograms").fill("20");
  await expect(page.locator("#quote-weight")).toHaveValue("20");
  await expect(page.getByRole("link", { name: "Confirm Exact Price on WhatsApp" })).toBeVisible();
});

test("the service enquiry opens WhatsApp with all customer details", async ({ page, context }) => {
  // Capture the external handoff without sending a message or contacting a customer.
  await context.route("https://wa.me/**", (route) => route.fulfill({ status: 200, contentType: "text/html", body: "Draft handoff captured" }));
  await page.getByRole("button", { name: "Our services", exact: true }).click();
  await page.locator("#service-menu").getByRole("button", { name: "Import & export clearing" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("dialog", { name: "Import & export clearing" }).getByRole("button", { name: "Discuss this service" }).click();
  await expect(page.locator("#contact-service")).toHaveValue("clearance");
  await page.getByLabel("Full name").fill("Demo Traveller");
  await page.getByLabel("Phone number").fill("+234 800 000 0000");
  await page.locator("#contact-email").fill("traveller@example.test");
  await page.getByLabel("Your message").fill("Please help with a 35 kg shipment to London.");
  const popup = context.waitForEvent("page");
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  const external = await popup;
  await external.waitForURL("https://wa.me/**");
  const message = new URL(external.url()).searchParams.get("text");
  for (const value of ["Demo Traveller", "+234 800 000 0000", "traveller@example.test", "Import & export clearing", "35 kg shipment to London"]) expect(message).toContain(value);
  await expect(page.getByRole("status")).toContainText("Nothing has been sent automatically");
  await external.close();
  await page.getByRole("button", { name: "Send by email instead" }).click();
  await expect(page.getByRole("link", { name: "Open your draft again" })).toHaveAttribute("href", /^mailto:schmtj893@gmail.com\?subject=/);
});

test("empty contact requests do not produce a success or launch a handoff", async ({ page }) => {
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  await expect(page.locator("#contact-name")).toBeFocused();
  await expect(page.locator(".handoff-message")).toHaveCount(0);
});

test("all three restored showcase frames switch scenes independently with keyboard support", async ({ page }) => {
  const first = page.locator(".b-showcase-frame").nth(0);
  await expect(page.locator(".b-showcase-frame")).toHaveCount(3);
  await first.getByRole("tab", { name: "Feline Calm", exact: true }).click();
  await expect(first.getByRole("tabpanel")).toContainText("quiet preparation routine");
  await expect(first.getByRole("tabpanel").locator("img")).toHaveAttribute("src", "/images/cat.webp");
  await page.keyboard.press("ArrowRight");
  await expect(first.getByRole("tabpanel")).toContainText("permit checks before booking");
  await page.keyboard.press("Home");
  await expect(first.getByRole("tabpanel").locator("img")).toHaveAttribute("src", "/images/dog.webp");
  await page.getByRole("tab", { name: "Release & collection" }).click();
  await expect(page.locator("#showcase-1-panel")).toContainText("collection instructions");
  await page.getByRole("tab", { name: "Sunset Climb" }).click();
  await expect(page.locator("#showcase-2-panel img")).toHaveAttribute("src", "/images/freight-takeoff.webp");
});

test("tracking distinguishes known samples from unknown shipment references", async ({ page }) => {
  await page.getByRole("button", { name: "Track shipment", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Shipment tracking" });
  await dialog.getByLabel("Shipment reference").fill("unknown-reference");
  await dialog.getByRole("button", { name: "Track", exact: true }).click();
  await expect(dialog).toContainText("No sample shipment matches");
  await dialog.getByRole("button", { name: "Try a sample shipment" }).click();
  await expect(dialog).toContainText("Sample data only");
  await expect(dialog).toContainText("London");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(page.locator(".tarmac-track")).toBeFocused();
});

test("mobile navigation, reduced motion, and responsive widths work", async ({ page }) => {
  for (const width of [320, 375, 390, 700, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.locator("#mobile-navigation").getByRole("link", { name: "Live Animals" }).click();
  await expect(page).toHaveURL(/#animals$/);
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  await expect(page.locator(".mobile-dock")).toBeVisible();
  await expect(page.locator(".network-marquee")).toHaveCSS("animation-name", "none");
  await page.getByRole("link", { name: "Get a quote for cats", exact: true }).click();
  await expect(page.locator("#quote-animal")).toHaveValue("cat");
});