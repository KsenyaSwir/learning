const { test, chromium } = require("@playwright/test");

test("Codegen flow", async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL("https://www.saucedemo.com/inventory.html");
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('a:has-text("2")').click();
  await page.waitForURL("https://www.saucedemo.com/cart.html");
  await page.locator('[data-test="checkout"]').click();
  await page.waitForURL("https://www.saucedemo.com/checkout-step-one.html");
  await context.close();
  await browser.close();
});
