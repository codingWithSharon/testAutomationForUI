const { test, expect } = require('@playwright/test');
const { LoginPage, ShopAndCheckout } = require('../models/webshop.model');

//const LoginPage = require('../models/webshop.model');

const exp = require('constants');

test('1 succesfull standardLogin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.standardLogin();
    const isSuccessful = await loginPage.isLoginSuccessfull();
    expect(isSuccessful).toBe(true);
});

test('2 lockedOutUserLoginAttempt', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.lockedOutUser();
    const checkForMessage = await loginPage.failureMessage();
    expect(checkForMessage).toBe(true);
});

test('3 check product', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.standardLogin();
    const checkItemText = await loginPage.checkProduct();
    expect(checkItemText).toBe('Sauce Labs Backpack');
});

test('4 Add item to cart and checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const shopAndCheckout = new ShopAndCheckout(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.standardLogin();
    await expect(shopAndCheckout.addToCartButton).toHaveText('Add to cart');
    await shopAndCheckout.addToCart();
    await expect(shopAndCheckout.removeButton).toHaveText('Remove');
    await expect(shopAndCheckout.productName).toHaveText('Sauce Labs Backpack');
    await expect(shopAndCheckout.cartQuantity).toHaveText('1');
    await expect(shopAndCheckout.productPrice).toHaveText('$29.99');
    await shopAndCheckout.readyForCheckout();
});

