const { expect } = require("@playwright/test");

class LoginPage {
    constructor(page) {
        this.page = page;
        this.backpackTextCheck = page.locator("(//div[@class='inventory_item_name '])[1]");
        this.firstItemLinkCheck = page.locator("(//div[@class='inventory_item_name '])[1]");
        this.homepageCheck = page.locator("//span[@class='title']");
        this.loginButton = page.locator("//input[@id='login-button']");
        this.loginFailureMessageCheck = page.locator("//div[@class='error-message-container error']");
        this.passwordField = page.getByPlaceholder("Password");
        this.usernameField = page.getByPlaceholder("Username");
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

    async checkProduct() {
        await this.backpackTextCheck.waitFor();
        return await this.backpackTextCheck.textContent('Sauce Labs Backpack');
    }
};

class shopAndCheckout {
    constructor(page) {
        this.page = page
        this.pageTitle = page.locator("//span[@class='title']");
        this.nameField = page.locator("//div//input[@class='input_error form_input'][1]");
        this.lastnameField = page.locator("//div//input[@class='input_error form_input'][2]");
        this.zipcodeField = page.locator("(//div//input[@class='input_error form_input'][3]");
        this.continueButton = page.locator("//input[@class='submit-button btn btn_primary cart_button btn_action']");
        
        this.goToCartButton = page.locator("(//button[@class='btn btn_primary btn_small btn_inventory '])[1]");
        this.addedToCartButtonCheck = page.locator("(//button[@class='btn btn_secondary btn_small btn_inventory '])[1]");
        this.checkoutInformationCheck = page.locator("//span[@class='title']");
        this.firstItemLinkCheck = page.locator("(//div[@class='inventory_item_name '])[1]");
    }

    async addToCart() {
        await this.goToCartButton.waitFor();
        return await this.addToCartButton.textContent('REMOVE');
    }
};

module.exports = { LoginPage, shopAndCheckout };
