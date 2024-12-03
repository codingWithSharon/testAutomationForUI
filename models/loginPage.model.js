class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.getByPlaceholder("Username");
        this.passwordField = page.getByPlaceholder("Password");
        this.loginButton = page.locator("login-button");
    }

    async login() {
        await this.usernameField.fill("John");
        await this.passwordField.fill("123");
        await this.loginButton.click();
    }
}

module.exports = LoginPage;