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

class ShopAndCheckout {
    constructor(page) {
        this.page = page
        this.addToCartButton = page.locator("#add-to-cart-sauce-labs-backpack");
        this.removeButton = page.locator("#remove-sauce-labs-backpack");
        this.shoppingCart = page.locator("a.shopping_cart_link");
        this.productName = page.locator("//div[@class='inventory_item_name']");
        this.cartQuantity = page.locator("//div[@class='cart_quantity']");
        this.productPrice = page.locator("//div[@class='inventory_item_price']");
        this.checkoutButton = page.locator("#checkout");

    }

    async addToCart() {
        await this.addToCartButton.click();
        await this.shoppingCart.click();
    }

    async readyForCheckout() {
        await this.checkoutButton.click();
    }
};

module.exports = { LoginPage, ShopAndCheckout };
