const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {Cart, CartPage} = require('./CartPage');
const {PaymentPage} = require('./PaymentPage');
const {OrderConformationPage} = require('./OrderConformationPage');
const {OrderPage} = require('./OrderPage');

class POManager {

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.paymentPage = new PaymentPage(this.page);
        this.orderConformationPage = new OrderConformationPage(this.page);
        this.orderPage = new OrderPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getPaymentPage(){
        return this.paymentPage;
    }

    getOrderConformationPage(){
        return this.orderConformationPage;
    }

    getOrderPage(){
        return this.orderPage;
    }
}

module.exports={POManager}