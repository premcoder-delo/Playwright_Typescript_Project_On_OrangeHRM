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
        try {
            await this.loaderSpinner.waitFor({
                state: 'visible',
                timeout: 2000
            });
        } catch {
            // loader never appeared
        }

        await this.loaderSpinner.waitFor({
            state: 'hidden',
            timeout
        }).catch(() => {
            // already hidden / detached
        });
    }

    async waitForPageReady() {
        await this.waitForPageLoad();
        await this.waitForLoaderToDisappear();
    }

    async clickWhenReady(locator: Locator) {
        await this.waitForLoaderToDisappear();
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async fillWhenReady(locator: Locator, value: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(value);
    }

    async isMobileView(): Promise<boolean> {
        return await this.page.locator('.oxd-topbar-header-hamburger').isVisible();
    }
}