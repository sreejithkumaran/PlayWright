class PaymentPage {
    constructor(page){
    
    this.page = page;
    this.inputField = page.locator("input");
    this.selectFieldDD = page.locator("select").first();
    this.selectFieldYY = page.locator("select").last();
    this.country = page.locator("[placeholder='Select Country']");
    this.email_lbl = page.locator(".user__name label");
    this.submit = page.locator(".action__submit");
  
    }

    async completePayment(details){

    const paymentDetails = new Map(details);
    console.log('paymentDetails size : '+paymentDetails.size)

    // Input Card Details
    await this.inputField.nth(1).fill("");
    await this.inputField.nth(1).fill(paymentDetails.get('cardNo'));
  
    // Select MM/YY
    await this.selectFieldDD.selectOption(paymentDetails.get('mm'));
    await this.selectFieldYY.selectOption(paymentDetails.get('yy'));
  
    // Input CVV Code
    await this.inputField.nth(2).fill(paymentDetails.get('cvv'));
  
    // Input Name on Card
    await this.inputField.nth(3).fill(paymentDetails.get('name'));
  
    // Validate Email
    //await expect(this.email_lbl).toHaveText("sreejith0607@yahoo.co.in");

   //Input Email
    await this.inputField.nth(5).fill("");
    await this.inputField.nth(5).fill(paymentDetails.get('email'));
  
    // Select Country
    const optionSection = this.page.locator(".ta-results");
    const options = optionSection.locator("button");
  
    await this.country.type(paymentDetails.get('country'), { delay: 500 });
  
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
  
    //const submitBtn = page.locator(".action__submit");
  
    await Promise.all([this.page.waitForNavigation(), this.submit.click()]);
    }
}

module.exports={PaymentPage}