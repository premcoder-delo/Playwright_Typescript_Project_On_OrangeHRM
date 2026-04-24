import { Locator, Page } from "@playwright/test";

export class TableComponent {
    private page: Page;
    private nextButton: Locator;
    private rowSelector: string;

    constructor(page: Page, rowSelector: string, nextButton: Locator) {
        this.page = page;
        this.rowSelector = rowSelector;
        this.nextButton = nextButton;
    }

    /**
     * Find row across pagination
     */
    async findRow(predicate: (row: Locator) => Promise<boolean>): Promise<Locator | null> {
        await this.page.locator('[role="row"]').nth(1).waitFor();

        while (true) {
            const rows = this.page.locator('[role="row"]');
            const count = await rows.count();

            for (let i = 0; i < count; i++) {
                const row = rows.nth(i);

                if (await predicate(row)) {
                    return row;
                }
            }

            if (await this.nextButton.count() === 0 || await this.nextButton.isDisabled()) {
                return null;
            }

            await this.nextButton.click();
            await this.page.waitForTimeout(1000);
        }
    }
}