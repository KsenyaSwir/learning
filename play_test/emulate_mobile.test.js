const { test, chromium, devices } = require("@playwright/test");
const iPhone = devices["iPhone 11"];

test("Emulate mobile device", async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });

  const context = await browser.newContext({
    ...iPhone,
    permissions: ["geolocation"],
    geolocation: { latitude: 29.57678, longitude: -96.045807 },
    locale: "en-GB",
  });

  const page = await context.newPage();

  await page.goto("https://www.google.com/maps");
  await page.waitForTimeout(5000);
  await browser.close();
});
