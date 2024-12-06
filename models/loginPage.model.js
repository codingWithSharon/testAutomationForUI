const { expect } = require("@playwright/test");

class LoginPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.locator("(//button[@class='btn btn_primary btn_small btn_inventory '])[1]");
        this.addedToCartButtonCheck = page.locator("(//button[@class='btn btn_secondary btn_small btn_inventory '])[1]");
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

    async addToCart() {
        await this.addToCartButton.click();
        return await this.addToCartButton.textContent('REMOVE');
    }

    async addedToCartCheck() {
        return await this.addedToCartButtonCheck.textContent('Add to cart');
    }

};

module.exports = LoginPage;