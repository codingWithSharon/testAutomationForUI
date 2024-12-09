const { test, expect } = require('@playwright/test');
const { LoginPage, shopAndCheckout } = require('../models/webshop.model');

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

test('4 Add item to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const shopAndCheckoutInstance = new shopAndCheckout(page);
    
    await page.goto('https://www.saucedemo.com/');
    await loginPage.standardLogin();
    await shopAndCheckoutInstance.addToCart();
    const checkCartButton = await shopAndCheckoutInstance.addedToCartButtonCheck.textContent();
    expect(checkCartButton).toBe('REMOVE');
});
