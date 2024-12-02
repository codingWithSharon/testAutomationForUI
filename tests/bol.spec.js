const { test, expect } = require('@playwright/test');
const BolPage = require('../models/bol.model');

test('Basic Search', async ({ page }) => {
    const bolPage = new BolPage(page, expect);

    await page.goto('https://www.bol.com');
    await bolPage.searchFor('Books');
    await bolPage.expectedSearchResultPage("‘Books’ in Alle artikelen");
});
