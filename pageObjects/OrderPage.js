class OrderPage{
    constructor(page){
        this.page = page;
        this.orderTable = page.locator(".table .ng-star-inserted");
        this.table = page.locator("tbody tr");
        this.placeOrderIds = page.locator(".table .ng-star-inserted th");
        this.deleteBtn = page.locator(".btn.btn-danger");
        this.tableBody = page.locator("tbody tr");
    }

    async displayOrders(){
        await this.placeOrderIds.last().waitFor();
    }

    async totalOrders(){
        const orderCount = await this.placeOrderIds.count();
        console.log('(order) Total Orders '+ orderCount);
        return orderCount;
    }

    async deleteOrder(orderId, count){
        let deleteFlag = false;
        console.log('(orders) : '+orderId+" ------ "+count);

        for (let i = 0; i < count; i++) {
            const getText = await this.placeOrderIds.nth(i).textContent();
            console.log("(orders) Text : " + getText);
        
            if (getText === orderId) {
              console.log(" (orders) order Id found ...");
              await this.tableBody.nth(i).locator("button").last().click();
              console.log(" (order ) Delete button clicked");
              deleteFlag = true;
              break;
            }
          }
          return deleteFlag;
    }

    async orderDispalyed(orderId){
        const isOrderDispalyed = await this.getProductLocator(orderId)
    console.log(`(order) ${orderId} => ` + isOrderDispalyed);
    return isOrderDispalyed;
    }

    getProductLocator(productName){
        const isDispalyed =  this.page.locator("h3:has-text('"+productName+"')").isVisible();


    }

}

module.exports={OrderPage}