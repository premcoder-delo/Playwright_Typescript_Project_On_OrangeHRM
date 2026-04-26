import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../core/base/BasePage";

export class LeftNavigationPage extends BasePage {

    readonly orangeHRMLogo: Locator;
    readonly leftNavigationTabs: Locator;
    readonly pimVerticalTab: Locator;
    readonly recruitmentVerticalTab: Locator;

    constructor(page: Page) {
        super(page);
        this.orangeHRMLogo = page.getByRole('link', { name: 'client brand banner' });
        this.leftNavigationTabs = page.locator("//ul[@class='oxd-main-menu']");
        this.pimVerticalTab = page.getByRole('link', { name: 'PIM' });
        this.recruitmentVerticalTab = page.getByRole('link', { name: 'Recruitment' });
    }

    async openPIMVerticalTab() {
        await this.pimVerticalTab.click();
        await this.waitForLoaderToDisappear();
    }

    async openRecruitmentVerticalTab() {
        await this.recruitmentVerticalTab.click();
        await this.waitForLoaderToDisappear();
    }
}