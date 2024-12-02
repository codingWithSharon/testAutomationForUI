class BolPage {
    constructor(page, expect) {
        this.page = page
        this.expect = expect
        this.searchBar = page.locator("//*[@id='searchfor']")
        this.submitSearchButton = page.locator("//button[@type='submit']")
        this.searchResultPage = page.locator("//*[@id='js_listpage_objects']/h1")
        this.termsAndConditionsBanner = page.locator("//button[text()='Alles accepteren' and contains(@class, 'c-PJLV')]")
        this.continueAndExitBanner = page.locator("//button[text()='Doorgaan' and contains(@class, 'c-PJLV')]")
    }

    async searchFor() {
        await this.termsAndConditionsBanner.click();
        await this.continueAndExitBanner.click();
        await this.searchBar.fill("Books");
        await this.submitSearchButton.click();
    }

    async expectedSearchResultPage(text) {
        await this.expect(this.searchResultPage).toHaveText(text);
    }
}

module.exports = BolPage;
