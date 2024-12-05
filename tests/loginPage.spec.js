const { test, expect } = require('@playwright/test');
const LoginPage = require('../models/loginPage.model');
const exp = require('constants');

test('succesfull standardLogin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.standardLogin();
    const isSuccessful = await loginPage.isLoginSuccessfull();
    expect(isSuccessful).toBe(true);
});

test('lockedOutUserLoginAttempt', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.lockedOutUser();
    const checkForMessage= await loginPage.failureMessage();
    expect(checkForMessage).toBe(true);
});

test('', async ({ page }) => {
	// write test here
});