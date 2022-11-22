// @ts-check
const { test, expect, chromium } = require("@playwright/test");

test("add and remove element", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/");
  await expect(page).toHaveTitle(/The Internet/);
  const add_remove_link = page.getByRole("link", {
    name: "Add/Remove Elements",
  });
  await expect(add_remove_link).toHaveAttribute(
    "href",
    "/add_remove_elements/"
  );
  await add_remove_link.click();
  await expect(page).toHaveURL(/.*add_remove_elements/);
  await page.getByRole("button", { name: "Add Element" }).click();
  await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByRole("button", { name: "Delete" })).not.toBeVisible();
});

test("base alert auth", async () => {
  const browser = await chromium.launch({ slowMo: 400 });
  const page = await browser.newPage();
  await page.goto("http://the-internet.herokuapp.com/");
  await expect(page).toHaveTitle(/The Internet/);
  const base_auth_link = page.getByRole("link", {
    name: "Basic Auth",
  });
  await expect(base_auth_link).toHaveAttribute("href", "/basic_auth");

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("prompt");
    await dialog.accept("admin");
  });
  await base_auth_link.click();
});

test("Checkboxes", async () => {
  const browser = await chromium.launch({ slowMo: 400 });
  const page = await browser.newPage();
  await page.goto("http://the-internet.herokuapp.com/");
  await expect(page).toHaveTitle(/The Internet/);
  page
    .getByRole("link", {
      name: "Checkboxes",
    })
    .click();
  await expect(page.locator("#checkboxes")).toBeVisible();
  expect(await page.isChecked("input[type=checkbox]:nth-child(1)")).toBeFalsy();
  expect(
    await page.isChecked("input[type=checkbox]:nth-child(3)")
  ).toBeTruthy();
  await page.check("input[type=checkbox]:nth-child(1)");
  await page.uncheck("input[type=checkbox]:nth-child(3)");
  expect(
    await page.isChecked("input[type=checkbox]:nth-child(1)")
  ).toBeTruthy();
  expect(await page.isChecked("input[type=checkbox]:nth-child(3)")).toBeFalsy();
});

test("Inputs username/password", async () => {
  const browser = await chromium.launch({ slowMo: 100 });
  const page = await browser.newPage();
  await page.goto("http://the-internet.herokuapp.com/");
  await expect(page).toHaveTitle(/The Internet/);
  page
    .getByRole("link", {
      name: "Forgot Password",
    })
    .click();
  await expect(page).toHaveURL(/.*forgot_password/);
  const email = await page.$("#email");
  await email.type("kenia@mail.com");
  const submit_button = await page.$("#form_submit");
  await submit_button.click();
});

test("Dropdown", async () => {
  const browser = await chromium.launch({ slowMo: 100 });
  const page = await browser.newPage();
  await page.goto("http://the-internet.herokuapp.com/");
  await expect(page).toHaveTitle(/The Internet/);
  page
    .getByRole("link", {
      name: "Dropdown",
    })
    .click();
  await expect(page).toHaveURL(/.*dropdown/);
  const dropdown = await page.$("#dropdown");
  await dropdown.selectOption({ value: "1" });
  await dropdown.selectOption({ label: "Option 2" });
  await dropdown.selectOption({ index: 1 });

  const options = await page.$$("option");

  for (let i = 0; i < options.length; i++) {
    console.log(await options[i].innerText());
  }
});

test("iFrames", async () => {
  const browser = await chromium.launch({ slowMo: 100 });
  const page = await browser.newPage();
  await page.goto("http://the-internet.herokuapp.com/iframe");
  await expect(page).toHaveTitle(/The Internet/);
  const textarea = await page.frameLocator("#mce_0_ifr").locator("#tinymce");
  await textarea.fill("iframe text");
  await expect(textarea).toHaveText("iframe text");
});

test("Element state", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://demoqa.com/automation-practice-form");

  const firstName = await page.$("#firstName");
  const sportsCheck = await page.$("#hobbies-checkbox-1");
  const submitBtn = await page.$("#submit");

  console.log(await firstName.isDisabled());
  console.log(await firstName.isEnabled());
  console.log(await firstName.isEditable());
  console.log(await sportsCheck.isChecked());
  console.log(await sportsCheck.isVisible());
  console.log(await submitBtn.isHidden());
  console.log(await submitBtn.isVisible());
});

test("Take a screenshots", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://the-internet.herokuapp.com");
  await page.screenshot({ path: "screenshots/screenshot.png" });
  await page.screenshot({
    path: "screenshots/fullpage.png",
    fullPage: true,
  });
});

test("Record a video", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://the-internet.herokuapp.com");
  await page.screenshot({ path: "screenshots/screenshot.png" });
  await page.screenshot({
    path: "screenshots/fullpage.png",
    fullPage: true,
  });
});
