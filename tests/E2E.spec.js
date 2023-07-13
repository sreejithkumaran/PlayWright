const { test, expect } = require("@playwright/test");
const { map: paymentDetails } = require("lodash");
// const {LoginPage} = require('../pageObjects/LoginPage');
// const {DashboardPage} = require('../pageObjects/DashboardPage');
// JSON -> String -> JS Object
const dataset = JSON.parse(JSON.stringify(require('../DataSet/Cred.json')));
const orderset =  JSON.parse(JSON.stringify(require('../DataSet/Order.json'))); 

const {POManager} = require('../pageObjects/POManager')

for(const data of orderset){
  test.only(`E2E scenario : Product = ${data.product} `, async ({ page }) => {

    // const loginPage = new LoginPage(page);
    // const dashboardPage = new DashboardPage(page);
    const poManger = new POManager(page);
    const loginPage = poManger.getLoginPage()
    const dashboardPage = poManger.getDashboardPage();
    const cartPage = poManger.getCartPage();
    const paymentPage = poManger.getPaymentPage();
    const orderConformationPage = poManger.getOrderConformationPage();
    const orderPage = poManger.getOrderPage();

    await loginPage.goTo(dataset.url)
    await loginPage.login(dataset.username, dataset.password)

    await page.waitForLoadState("networkidle");
  
    const productTitles = await dashboardPage.getProducts();
    console.log('Product Title : '+productTitles +" | "+productTitles.count);

   const productCount = await dashboardPage.countProducts();
   console.log('No of Products (E2E) : '+productCount)

    //const productPrice = "iphone 13 pro";
    const productPrice = orderset.product;
    let productIndex = await dashboardPage.searchProduct(productPrice, productCount);
    productIndex = productIndex-1;
    const productExists = productIndex === 0 ? false:true
    console.log("Product Found (E2E) : "+productExists);

    //get Product Price
    const price = await dashboardPage.getProductPrice(productIndex)
    console.log(productPrice+" = "+price);

    //Add product to cart
    await dashboardPage.addProductsToCart(productIndex)

    // click on cart
    await dashboardPage.goToCart();

    await cartPage.waitForItems();
    const itemsInCart = cartPage.getTotalItemCount();
    console.log('Items in cart = '+itemsInCart)
  
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    console.log("iphone 13 pro is visible : " + bool);
    //expect(bool).toBeTruthy();
  
    // Validate correct amount , buy and delete button displayed
    const subtotal = await cartPage.getTotal();
    const total = await cartPage.getTotal();  
    console.log("Sub Total : [ " + subtotal + " ] |  Total : " + total);
  
    // Check Out
    await cartPage.checkOut();

    // Complete Payment
    const paymentDetails = new Map();
    paymentDetails.set('cardNo',"4542 9931 9292 2293");
    paymentDetails.set('mm','12');
    paymentDetails.set('yy','25')
    paymentDetails.set('cvv','123');
    paymentDetails.set('name','david thomas')
    paymentDetails.set('email','sreejith0607@yahoo.co.in')
    paymentDetails.set('country','india')
    await paymentPage.completePayment(paymentDetails);

    // Validate order message
    const orderMsg = await orderConformationPage.getSuccessMessage();
    console.log('msg : '+orderMsg);
    // Validate success messaage - remove space
  
    // Get Order id
    const orderId = await orderConformationPage.getOrderId();
    console.log("Order Id : " + orderId);
    // Validate name and price of the product
  
    // Click on Order Page
    await dashboardPage.goToOrders();

    // Total Ordes
    await orderPage.displayOrders();
    const totalOrders = await orderPage.totalOrders();
    console.log('Total Orders : '+totalOrders);

    //Delete Order
    const deleteOrder = await orderPage.deleteOrder(orderId, totalOrders);
    console.log('delete order : '+deleteOrder);

    // Order displayed.
    const orderDisplayed = await orderPage.orderDispalyed(orderId);
    console.log(`order id ${orderId} displayed { ${orderDisplayed}}`)
  
   // Empty the cart 
    console.log("---- END ----");
  });
}
