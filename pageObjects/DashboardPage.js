class DashboardPage {

  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productTitles = page.locator(".card-body b");
    this.cart = page.locator("[routerlink='/dashboard/cart']");
    this.orders = page.locator("[routerlink='/dashboard/myorders']");
  }

  async getProducts() {
    const prodTitles = await this.productTitles.allTextContents();
    console.log("getProducts() : " + prodTitles);
    return prodTitles;
  }

  async countProducts() {
    const pCount = await this.productTitles.count();
    console.log("countProducts ( dashboard ) : " + pCount);
    return pCount;
  }

  async searchProduct(prod,count) {
    console.log(prod+" ------ "+count);
    let pIndex = 0;
    let loc;
    // const count = countProducts();
    for (let i = 0; i < count; i++) {
        loc = await this.products.nth(i).locator("b").textContent();
        console.log('current locator : '+loc)
      if (await loc === "iphone 13 pro") {
         console.log(' ( dashboard ) Search Product  { '+prod+' } Found');
        pIndex = i;
        break;
      }
    }
    console.log("Product Found (dashboard) : "+pIndex);
    return pIndex+1;
  }

  async getProductPrice(index){
    const price = await this.products.nth(index).locator("> div > div").textContent();
    console.log("Product Price (dashboard) : "+price);
    return price;
  }
  
  async addProductsToCart(index){
    await this.products.nth(index).locator("text= Add To Cart").click();
  }

  async goToCart(){
    await this.cart.click();
    console.log('Go to CART')
  }

  async noOfItemsInCart(){
    const noOfCartItems = await page
    .locator("button[class='btn btn-custom'] label")
    .textContent();
    console.log(" (dashboard) Cart Items : " + noOfCartItems);
    return noOfCartItems
  }

  async goToOrders(){
    await this.orders.first().click();
    console.log('Go to ORDERS')
    this.page.waitForLoadState("networkidle");
  }

 
}



module.exports = { DashboardPage };
