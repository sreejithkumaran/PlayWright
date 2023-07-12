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

    async completePayment(){
    // Input Card Details
    await this.inputField.nth(1).fill("");
    await this.inputField.nth(1).fill("4542 9931 9292 2293");
  
    // Select MM/YY
    await this.selectFieldDD.selectOption("10");
    await this.selectFieldYY.selectOption("25");
  
    // Input CVV Code
    await this.inputField.nth(2).fill("123");
  
    // Input Name on Card
    await this.inputField.nth(3).fill("david thomas");
  
    // Validate Email
    //await expect(this.email_lbl).toHaveText("sreejith0607@yahoo.co.in");

   //Input Email
    await this.inputField.nth(5).fill("");
    await this.inputField.nth(5).fill("sreejith0607@yahoo.co.in");
  
    // Select Country
    const optionSection = this.page.locator(".ta-results");
    const options = optionSection.locator("button");
  
    await this.country.type("india", { delay: 500 });
  
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