const { test, expect, request } = require("@playwright/test");
const {APIUtils} = require('./utils/APIUtils');

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

let response;
test.beforeAll(async () => {
  
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
 
});

test.beforeEach(() => {});

test("Client Login App", async ({ page }) => {

  // Insert value in local storage
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token );

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

    if (getText === response.orderId) {
      console.log("order Id found ...");
      const table = page.locator("tbody tr");
      await table.nth(i).locator("button").last().click();
      // await placeOrderIds.nth(i).deleteBtn.click();
      console.log("Delete button clicked");
      break;
    }
  }
  
});
