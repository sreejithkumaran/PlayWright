const { test, expect, request } = require("@playwright/test");

const loginPayload = {
  userEmail: "sreejith0607@yahoo.co.in",
  userPassword: "@Ripsk$1984",
};

const orderPayload = {
    orders: [
      {
        country: "Cuba",
        productOrderedId: "6262e990e26b7e1a10e89bfa"
      }
    ]
}

let token;
let orderId;

test.beforeAll(async () => {

  // Login
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: loginPayload }
  );

  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();

  token = loginResponseJson.token;
  console.log("Token : " + token);

  
  // Create orders
  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
  {
    data : orderPayload,
    headers:{
      'Authorization' : token,
      'Content-Type' : 'application/json'
    },
  })

  const orderResponseJson = await orderResponse.json();
  console.log(orderResponseJson)
  orderId = orderResponseJson.orders[0];

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

  // Add to cart : https://rahulshettyacademy.com/api/ecom/user/add-to-cart
  // Place Orders : https://rahulshettyacademy.com/api/ecom/order/create-order

  await page.pause();

  //Go to my Orders
  await page.locator("[routerlink='/dashboard/myorders']").click();

  const orderTable = page.locator(".table .ng-star-inserted");
  const table = page.locator("tbody tr");

  const placeOrderIds = orderTable.locator(" th");
  const deleteBtn = page.locator(".btn.btn-danger");

  await placeOrderIds.last().waitFor();

  const orderCount = await placeOrderIds.count();

  console.log("Total Orders : " + orderCount);

  for (let i = 0; i < orderCount; i++) {
    const getText = await placeOrderIds.nth(i).textContent();
    // const rowOrderId = await rows.nth(i).locator("th").textContext();
    console.log("Text : " + getText);

    if (getText === orderId) {
      console.log("order Id found ...");
      const table = page.locator("tbody tr");
      await table.nth(i).locator("button").last().click();
      // await placeOrderIds.nth(i).deleteBtn.click();
      console.log("Delete button clicked");
      break;
    }
  }
  
});
