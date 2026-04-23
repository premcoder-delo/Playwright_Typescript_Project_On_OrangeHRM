import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../core/base/BasePage";

export class UserProfilePage extends BasePage {
    readonly userMenuButton: Locator;
    readonly userLogoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.userMenuButton = page.locator("//i[contains(@class, 'userdropdown-icon')]");
        this.userLogoutButton = page.getByRole('menuitem', { name: 'Logout' });
    }

    async logoutHRM() {
        await this.userMenuButton.click();
        await this.userLogoutButton.click();
        await this.waitForURLContains('/auth/login');
    }
}