import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../core/base/BasePage";
import { TableComponent } from "../../core/components/TableComponent";

export class PIMPage extends BasePage {

    // 🔹 Locators
    readonly addPIMButton: Locator;
    readonly firstNameTextBox: Locator;
    readonly middleNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly saveButton: Locator;
    readonly newEmployeeNameHeading: Locator;
    readonly deleteSelectedButton: Locator;
    readonly confirmDeleteButton: Locator;
    readonly nextPageButton: Locator;

    // 🔹 Constructor
    constructor(page: Page) {
        super(page);

        this.addPIMButton = page.getByRole('button', { name: 'Add' });
        this.firstNameTextBox = page.getByRole('textbox', { name: 'First Name' });
        this.middleNameTextBox = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastNameTextBox = page.getByRole('textbox', { name: 'Last Name' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.newEmployeeNameHeading = page.locator('.orangehrm-edit-employee-name h6');

        this.deleteSelectedButton = page.getByRole('button', { name: 'Delete Selected' });
        this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
        this.nextPageButton = page.locator('button:has(i.bi-chevron-right)');
    }

    // 🔹 Actions

    async addEmployee(firstName: string, middleName: string, lastName: string) {
        await this.addPIMButton.click();
        await this.firstNameTextBox.waitFor({ state: 'visible' });

        await this.firstNameTextBox.fill(firstName);
        await this.middleNameTextBox.fill(middleName);
        await this.lastNameTextBox.fill(lastName);
    }

    async saveEmployeeAndWaitForDetails() {
        await this.saveButton.click();
    }

    async deleteSelectedEmployee() {
        await this.deleteSelectedButton.click();
        await this.confirmDeleteButton.click();
    }

    // 🔹 Helpers

    async searchEmployeeByIdAndSelect(employeeId: string) {
        const table = this.getEmployeeTable();

        const row = await table.findRow(async (row) => {
            const cell = row.locator(`//div[normalize-space()='${employeeId}']`);
            return (await cell.count()) > 0;
        });

        if (!row) {
            throw new Error(`Employee ID ${employeeId} not found`);
        }

        await row.locator('.oxd-checkbox-input').click();
    }

    // 🔹 Getters / State
    private getEmployeeTable(): TableComponent {
        return new TableComponent(
            this.page,
            "[role='row']",
            this.nextPageButton
        );
    }
    getEmployeeRow(employeeId: string): Locator {
        return this.page.locator(
            `//div[normalize-space()='${employeeId}']//ancestor::div[@role='row']`
        );
    }
}