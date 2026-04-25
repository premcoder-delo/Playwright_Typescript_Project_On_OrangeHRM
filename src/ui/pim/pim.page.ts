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

    readonly employeeSearchTextBox: Locator;
    readonly searchButton: Locator;
    readonly resultTable: Locator;
    readonly resultSummary: Locator;

    readonly firstEditButton: Locator;
    readonly successToast: Locator;

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

        this.employeeSearchTextBox = page.getByRole('textbox', { name: 'Type for hints...' }).first();
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resultTable = page.getByRole('table');
        this.resultSummary = page.locator('#app');

        this.firstEditButton = page.locator('button:has(i.bi-pencil-fill)').first();
        this.successToast = page.locator('#oxd-toaster_1');
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

    async searchEmployeeByName(employeeName: string) {
        await this.employeeSearchTextBox.fill(employeeName);
        await this.searchButton.click();
    }

    async clickFirstEditEmployee() {
        await this.firstEditButton.click();
    }

    async updateEmployeeName(firstName: string, middleName: string, lastName: string) {
        await this.waitForLoaderToDisappear();
        await this.firstNameTextBox.fill(firstName);
        await this.middleNameTextBox.fill(middleName);
        await this.lastNameTextBox.fill(lastName);
    }

    async updateEmployeeId(employeeId: string) {
        await this.page.locator('.oxd-input-group', {
            has: this.page.getByText('Employee Id')
        }).locator('input').fill(employeeId);
    }

    async selectNationality(value: string) {
        await this.page.locator('.oxd-input-group', {
            has: this.page.getByText('Nationality')
        }).locator('.oxd-select-text').click();

        await this.page.getByRole('option', { name: value, exact: true }).click();
    }

    async selectMaritalStatus(value: string) {
        await this.page.locator('.oxd-input-group', {
            has: this.page.getByText('Marital Status')
        }).locator('.oxd-select-text').click();

        await this.page.getByRole('option', { name: value }).click();
    }

    async updateDateOfBirth(date: string) {
        await this.page.locator('.oxd-input-group', {
            has: this.page.getByText('Date of Birth')
        }).locator('input').fill(date);
    }

    async selectGender(gender: string) {
        await this.page
            .locator('.oxd-input-group:has-text("Gender")')
            .getByText(gender, { exact: true })
            .click();
    }

    async savePersonalDetails() {
        await this.page.locator('form').filter({
            has: this.page.getByText('Employee Full Name')
        }).getByRole('button', { name: 'Save' }).click();
        await this.waitForLoaderToDisappear();
    }

    async selectBloodType(value: string) {
        await this.page.locator('.oxd-input-group', {
            has: this.page.getByText('Blood Type')
        }).locator('.oxd-select-text').click();

        await this.page.getByRole('option', { name: value }).click();
    }

    async fillCustomField(value: string) {
        await this.page.locator('.oxd-input-group', {
            has: this.page.getByText('Test_Field')
        }).locator('input').fill(value);
    }

    async saveCustomDetails() {
        await this.page.locator('form').filter({
            has: this.page.getByText('Test_Field')
        }).getByRole('button', { name: 'Save' }).click();
        await this.waitForLoaderToDisappear();
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