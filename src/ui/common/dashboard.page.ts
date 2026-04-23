import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../core/base/BasePage";

export class DashboardPage extends BasePage {
    readonly dashboardTitleText: Locator;

    constructor(page: Page) {
        super(page);
        this.dashboardTitleText = page.getByRole('link', { name: 'Dashboard' });
    }
}