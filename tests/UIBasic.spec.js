const { test, expect } = require("@playwright/test");

// https://demo.automationtesting.in/Register.html

// https://demoqa.com/login

test("First Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://demoqa.com/automation-practice-form");
});

test("Page Playwright test", async ({ page }) => {
  // const context = await browser.newContext()
  // const page = await context.newPage();
  await page.goto("https://demoqa.com/automation-practice-form");
  console.log(await page.title());
  await expect(page).toHaveTitle("DEMOQA");
});

test("Login Page", async ({ page }) => {
  //locators
  const homePageText = page.locator("form[id='userForm'] h5");
  const userName = page.locator("#userName");
  const password = page.locator("#password");
  const loginBtn = page.locator("#login");
  const invalidLoginMsg = page.locator("#name");
  const useName = page.locator("#userName-value");
  const logoutBtn = page.locator(
    "body div[id='fixedban'] div div:nth-child(1)"
  );

  await page.goto("https://demoqa.com/login");

  // Page Title is DEMOQA
  await expect(page).toHaveTitle("DEMOQA");

  // Login in Book Store
  await expect(homePageText).toContainText("Login in Book Store");

  // Enter login cred
  await userName.type("demoQA");
  await password.type("12345");
  await loginBtn.click();

  // Validate invalid cred msg
  await expect(invalidLoginMsg).toContainText("Invalid username or password!");

  await userName.fill("");
  await userName.fill("demoQA");
  await password.fill("");
  await password.type("@Ripsk$1984");

  await Promise.all([page.waitForNavigation(), loginBtn.click()]);

  //await loginBtn.click();

  //Validate userName is displayed
  await expect(useName).toContainText("demoqa");

  //Validate Logout button is displayed
  console.log("Logout button displayed : " + (await logoutBtn.isVisible()));

  await logoutBtn.click();
});

test("Display Products", async ({ page }) => {
  const bookTitles = page.locator(".ReactTable.-striped.-highlight a");

  await page.goto("https://demoqa.com/books");

  const allTitles = await bookTitles.allTextContents();
  console.log("Book Titles : => " + allTitles);

  //check if a book with title - Understanding ECMAScript 6 exists
  const bookExists = allTitles.includes("Understanding ECMAScript 6");
  console.log("Book exists " + bookExists); // True

  if (bookExists) {
    // get the index of the book
    const index = allTitles.indexOf("Understanding ECMAScript 6");
    console.log("Index of Book is " + index); // 7
  }
  // Get book other attributes
});

test("Display Products Lists", async ({ page }) => {
  const emailtxt = page.locator("#userEmail");
  const passwordtxt = page.locator("#userPassword");
  const loginbtn = page.locator("[value='Login']");

  const productTitles = page.locator(".card-body b");

  await page.goto("https://rahulshettyacademy.com/client");

  await emailtxt.fill("sreejith0607@yahoo.co.in");
  await passwordtxt.fill("@Ripsk$1984");
  await loginbtn.click();

  await page.waitForLoadState("networkidle");

  const prodTitles = await productTitles.allTextContents();
  console.log("product Titles : => " + prodTitles);
});

test("UI Component", async ({ page }) => {
  const usernametxt = page.locator("input#username");
  const passwordtxt = page.locator("input#password");
  const rolerdbtn = page.locator("input#usertype");
  const alertok = page.locator("button#okayBtn");
  const roledd = page.locator("select.form-control");
  const agreechk = page.locator("input#terms");
  const signinbtn = page.locator("input#signInBtn");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await usernametxt.fill("rahulshettyacademy");
  await passwordtxt.fill("learning");

  // expect(page.rolerdbtn.last()).toBeChecked();
  const isChecked = await page.locator("input#usertype").last().isChecked();
  console.log("is checked : " + isChecked);

  if (!isChecked) {
    console.log("isChecked : " + isChecked);
    await page.locator("input#usertype").last().click();
    await alertok.click();
  }

  await roledd.selectText("Teacher");

  //expect(await page.agreechk.isChecked).toBeFalsy();
  expect(await page.locator("input#terms").isChecked()).toBeFalsy();

  await agreechk.click();

  await signinbtn.click();

  await page.pause();
});

test("Handle Windows", async ({ browser }) => {
  const context = await browser.newContext();
  console.log("context : " + context);

  const page = await context.newPage();
  console.log("page : " + page);

  const clickBtn = page.locator("button.btn.btn-info");
  const tabbed = page.locator("a.analystic");

  await page.goto("https://demo.automationtesting.in/Windows.html");

  await tabbed.nth(0).click();

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    clickBtn.first().click(),
  ]);

  //await clickBtn.first().click();

  const webdriver = newPage.locator("h4.h3.mb-3.selenium-webdriver");
  const ide = newPage.locator("h4.h3.mb-3.selenium-ide");
  const grid = newPage.locator("h4.h3.mb-3.selenium-grid");

  await expect(newPage).toHaveTitle("Selenium");

  expect(await webdriver.isVisible());

  const isWebdriverVisible = await webdriver.isVisible();
  console.log("Webdriver displayed : " + isWebdriverVisible);

  // console.log("Selenium Webdriver : "+expect(await webdriver.isVisible()));
  // console.log("Selenium IDE : "+expect(await ide.isVisible()));
  // console.log("Selenium Grid : "+expect(await grid.isVisible()));

  await tabbed.nth(1).click();

  await page.pause();
});

test("E2E scenario", async ({ page }) => {
  const emailtxt = page.locator("#userEmail");
  const passwordtxt = page.locator("#userPassword");
  const loginbtn = page.locator("[value='Login']");

  const products = page.locator(".card-body");

  const productTitles = page.locator(".card-body b");

  await page.goto("https://rahulshettyacademy.com/client");

  await emailtxt.fill("sreejith0607@yahoo.co.in");
  await passwordtxt.fill("@Ripsk$1984");
  await loginbtn.click();

  await page.waitForLoadState("networkidle");

  const prodTitles = await productTitles.allTextContents();
  console.log("product Titles : => " + prodTitles);

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    if (
      (await products.nth(i).locator("b").textContent()) === "iphone 13 pro"
    ) {
      console.log("product iphone 13 pro found ..");
      const price = await products.nth(i).locator("> div > div").textContent();
      console.log("price for iphone 13 pro : " + price);
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  //Validate Cart item
  const noOfCartItems = await page
    .locator("button[class='btn btn-custom'] label")
    .textContent();
  console.log("Cart Items : " + noOfCartItems);

  // click on cart
  await page.locator("[routerlink='/dashboard/cart']").click();

  await page.locator("div li").first().waitFor();
  //await page.locator(".cart").waitFor();

  const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  console.log("iphone 13 pro is visible : " + bool);
  //expect(bool).toBeTruthy();

  // Validate correct amount , buy and delete button displayed
  const subtotal = await page.locator(".subtotal li span").nth(1).textContent();

  const total = await page.locator(".subtotal li span").nth(3).textContent();

  console.log("Sub Total : [ " + subtotal + " ] |  Total : " + total);

  await page.locator("button[type='button']").last().click();

  // Fill Credit card details
  const inputField = page.locator("input");
  const selectFieldDD = page.locator("select").first();
  const selectFieldYY = page.locator("select").last();
  const country = page.locator("[placeholder='Select Country']");

  // Card No
  await inputField.nth(1).fill("");
  await inputField.nth(1).fill("4542 9931 9292 2293");

  await selectFieldDD.selectOption("10");
  await selectFieldYY.selectOption("25");

  //CVV Code
  await inputField.nth(2).fill("123");

  // Name on Card
  await inputField.nth(3).fill("david thomas");

  //email
  const emailLoc = page.locator(".user__name label");
  await expect(emailLoc).toHaveText("sreejith0607@yahoo.co.in");

  await inputField.nth(5).fill("");
  await inputField.nth(5).fill("sreejith0607@yahoo.co.in");

  const optionSection = page.locator(".ta-results");
  const options = optionSection.locator("button");

  await country.type("india", { delay: 500 });

  await optionSection.waitFor();

  const optionCount = await options.count();
  console.log("Total Options = " + optionCount);

  for (let i = 0; i < optionCount; i++) {
    console.log("inside loop..");
    const getText = await options.nth(i).textContent();
    console.log("value = " + getText);
    if (getText === " India") {
      console.log("Option India Found ..");
      await options.nth(i).click();
      break;
    } else {
      console.log("else part");
    }
  }

  const submitBtn = page.locator(".action__submit");

  await Promise.all([page.waitForNavigation(), submitBtn.click()]);

  // Validate order message
  const ordermsg = page.locator(".hero-primary");
  await expect(ordermsg).toHaveText(" Thankyou for the order. ");

  // Get Order id
  const orderIdLoc = page.locator(".em-spacer-1 .ng-star-inserted");
  await orderIdLoc.waitFor();
  const oId = await orderIdLoc.textContent();
  const orderId = oId.replace(/[^a-z0-9]/gi, "");

  console.log("Order Id : " + orderId);
  //await page.pause();

  // Click on Order Page
  await page.locator("[routerlink='/dashboard/myorders']").first().click();
  // button[routerlink='/dashboard/myorders']

  page.waitForLoadState("networkidle");

  page.pause();

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
  await page.pause();
  await placeOrderIds.last().waitFor();

  const boolCheck = await page
    .locator("th:has-text('64a23d617244490f95730472')")
    .isVisible();
  console.log("64a23d617244490f95730472 : " + boolCheck);

  const boolCheck1 = await page
    .locator(`th:has-text('${orderId}')`)
    .isVisible();
  console.log(`${orderId} => ` + boolCheck1);

  const boolCheck2 = await page
    .locator("th:has-text('64a23d617244490f95711111')")
    .isVisible();
  console.log(`64a23d617244490f95711111 => ` + boolCheck2);

  console.log("---- END ----");
});

test.only('More Validations', async ({page}) => { 

    const displaytxt = page.locator('#displayed-text');
    const hidebtn = page.locator('#hide-textbox');
    const showbtn = page.locator('#show-textbox');


  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  //toBeVisible() , toBeHidden()
  await expect(displaytxt).toBeVisible();
  await hidebtn.click();
  await expect(displaytxt).toBeHidden();

  //alert
  page.on('dialog',dialog =>  dialog.accept());
  await page.locator('#alertbtn').click();

 // Mouse over



 // Iframe
const framePage = page.frameLocator("#courses-iframe");
await framePage.locator("li a[href='lifetime-access']:visible").click();
const textCheck = await framePage.locator(".text h2").textContent();
console.log(textCheck.split(" ")[1]);


})


