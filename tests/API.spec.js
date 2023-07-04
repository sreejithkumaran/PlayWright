const { test, expect, request } = require("@playwright/test");

const loginPayload = {
  userEmail: "sreejith0607@yahoo.co.in",
  userPassword: "@Ripsk$1984",
};

let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: loginPayload }
  );

  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();

  token = loginResponseJson.token;

  console.log("Token : " + token);
});

test.beforeEach(() => {});

test("Client Login App", async ({ page }) => {
  /*  SKIP UI LOGIN PART
  const emailtxt = page.locator("#userEmail");
  const passwordtxt = page.locator("#userPassword");
  const loginbtn = page.locator("[value='Login']");

  const productTitles = page.locator(".card-body b");

  await page.goto("https://rahulshettyacademy.com/client");

  await emailtxt.fill("sreejith0607@yahoo.co.in");
  await passwordtxt.fill("@Ripsk$1984");
  await loginbtn.click();

  await page.waitForLoadState("networkidle");
 */
  // Insert value in local storage
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token );

  await page.goto("https://rahulshettyacademy.com/client");

  const productTitles = page.locator(".card-body b");
  const prodTitles = await productTitles.allTextContents();
  console.log("product Titles : => " + prodTitles);

  await page.pause();
});
