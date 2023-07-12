class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("#userEmail");
    this.passwordInput = page.locator("#userPassword");
    this.loginBtn = page.locator("[value='Login']");
  }

  async goTo(url){
    await this.page.goto(url);
  }

  async login(userName, password) {
    //await this.page.goto(url)
    await this.emailInput.fill(userName); 
    await this.passwordInput.fill(password);  
    await this.loginBtn.click();
  }
}

module.exports = {LoginPage}
