class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.getByPlaceholder("Username");
        this.passwordField = page.getByPlaceholder("Password");
        this.loginButton = page.locator("//input[@id='login-button']");
        this.homepageCheck = page.locator("//span[@class='title']");
        this.firstItemLinkCheck = page.locator("(//div[@class='inventory_item_name '])[1]");
        this.loginFailureMessageCheck = page.locator("//div[@class='error-message-container error']");
    }

    async standardLogin() {
        await this.usernameField.fill("standard_user");
        await this.passwordField.fill("secret_sauce");
        await this.loginButton.click();
    }

    async isLoginSuccessfull() {
        await this.homepageCheck.waitFor();
        return await this.homepageCheck.isVisible();
    }

    async lockedOutUser() {
        await this.usernameField.fill("locked_out_user");
        await this.passwordField.fill("secret_sauce");
        await this.loginButton.click();
    }

    async failureMessage() {
        await this.loginFailureMessageCheck.waitFor();
        return await this.loginFailureMessageCheck.isVisible();
    }
}

module.exports = LoginPage;