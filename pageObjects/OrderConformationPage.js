class OrderConformationPage {
    constructor(page){
         this.ordermsg = page.locator(".hero-primary");
         this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async getSuccessMessage(){
         const msg = await this.ordermsg.textContent();
         console.log('(orderPage) msg : '+msg);
         return msg;
    }

    async getOrderId(){
        await this.orderId.waitFor();
        const oId = await this.orderId.textContent();
        const id = oId.replace(/[^a-z0-9]/gi, "");
        console.log('(order Page) Id' + id)
        return id;
    }

}

module.exports={OrderConformationPage}