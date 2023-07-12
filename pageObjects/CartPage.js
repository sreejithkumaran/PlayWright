class CartPage {
  constructor(page) {
    this.displyProducts = page.locator("div li.items");
    this.total = page.locator(".subtotal li span");
    this.checkOutBtn = page.locator("button[type='button']");
  }

  async waitForItems() {
    await this.displyProducts.last().waitFor();
  }

  async getTotalItemCount() {
    const count = await this.displyProducts.count();
    console.log("(cart) Items in cart " + count);
    return count;
  }

  async getSubTotal(){
    const subtotal = await this.total.nth(1).textContent();
    console.log('(cart) SubTotal : '+subtotal)
    return subtotal;
  }

  async getTotal(){
    const total = await this.total.nth(3).textContent();
    console.log('(cart) Total : '+total)
    return total;
  }

  async checkOut(){
    await this.checkOutBtn.last().click();
  }


}
module.exports={CartPage}