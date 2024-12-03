const { test, expect } = require('@playwright/test');
const LoginPage = require('../models/loginPage.model');

test('succesfull Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login();
})