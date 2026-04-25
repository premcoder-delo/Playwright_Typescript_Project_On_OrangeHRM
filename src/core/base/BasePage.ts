import { Locator, Page } from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected loaderSpinner: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loaderSpinner = page.locator('.oxd-loading-spinner').first();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForURLContains(value: string) {
        await this.page.waitForURL(`**${value}**`);
    }

    async waitForLoaderToDisappear(timeout: number = 10000) {
        await this.loaderSpinner.waitFor({
            state: 'hidden',
            timeout
        }).catch(() => {
            // spinner may not appear on every page action
        });
    }

    async waitForPageReady() {
        await this.waitForPageLoad();
        await this.waitForLoaderToDisappear();
    }
}