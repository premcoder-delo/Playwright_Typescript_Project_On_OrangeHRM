import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../core/base/BasePage";

export class LeftNavigationPage extends BasePage {
    readonly pimVerticalTab: Locator;
    readonly orangeHRMLogo: Locator;
    readonly leftNavigationTabs: Locator;

    constructor(page: Page) {
        super(page);

        this.pimVerticalTab = page.getByRole('link', { name: 'PIM' });
        this.orangeHRMLogo = page.getByRole('link', { name: 'client brand banner' });
        this.leftNavigationTabs = page.locator("//ul[@class='oxd-main-menu']");
    }

    async openPIMVerticalTab() {
        await this.pimVerticalTab.click();
    }
}