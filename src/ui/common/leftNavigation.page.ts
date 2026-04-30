import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../core/base/BasePage";

export class LeftNavigationPage extends BasePage {

    readonly orangeHRMLogo: Locator;
    readonly leftNavigationTabs: Locator;
    readonly mobileModeMenuButton: Locator;
    readonly pimVerticalTab: Locator;
    readonly recruitmentVerticalTab: Locator;

    constructor(page: Page) {
        super(page);
        this.orangeHRMLogo = page.getByRole('link', { name: 'client brand banner' });
        this.leftNavigationTabs = page.locator("//ul[@class='oxd-main-menu']");
        this.mobileModeMenuButton = page.locator("//div[@class='oxd-topbar-header-title']//i");
        this.pimVerticalTab = page.getByRole('link', { name: 'PIM' });
        this.recruitmentVerticalTab = page.getByRole('link', { name: 'Recruitment' });
    }

    // Actions
    async openPIMVerticalTab() {
        await this.navigateToModule(this.pimVerticalTab);
    }

    async openRecruitmentVerticalTab() {
        await this.navigateToModule(this.recruitmentVerticalTab);
    }

    // Reusable Navigation Helper
    async navigateToModule(moduleTab: Locator) {
        await this.openSideMenuIfMobile(moduleTab);
        await this.clickWhenReady(moduleTab);
    }

    // Mobile Helper
    async openSideMenuIfMobile(targetTab: Locator) {
        if (await this.mobileModeMenuButton.isVisible()) {
            await this.waitForPageReady();
            await this.clickWhenReady(this.mobileModeMenuButton);
            await targetTab.waitFor({ state: 'visible' });
        }
    }
}