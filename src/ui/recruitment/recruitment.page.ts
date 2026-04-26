import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../core/base/BasePage";

export class RecruitmentPage extends BasePage {

    // Locators
    readonly addButton: Locator;
    readonly firstNameTextBox: Locator;
    readonly middleNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly saveButton: Locator;
    readonly fileInput: Locator;
    readonly uploadedFileName: Locator;
    readonly statusLabel: Locator;

    constructor(page: Page) {
        super(page);

        this.addButton = page.getByRole('button', { name: 'Add' });
        this.firstNameTextBox = page.getByRole('textbox', { name: 'First Name' });
        this.middleNameTextBox = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastNameTextBox = page.getByRole('textbox', { name: 'Last Name' });

        this.saveButton = page.getByRole('button', { name: 'Save' });

        this.fileInput = page.locator('input[type="file"]');
        this.uploadedFileName = page.locator('.orangehrm-file-input');

        this.statusLabel = page.getByText('Status: Application Initiated');
    }

    async clickAddCandidate() {
        await this.addButton.click();
    }

    async fillCandidateName(first: string, middle: string, last: string) {
        await this.firstNameTextBox.fill(first);
        await this.middleNameTextBox.fill(middle);
        await this.lastNameTextBox.fill(last);
    }

    async selectVacancy(vacancy: string) {
        await this.page.locator('.oxd-select-text').click();
        await this.page.getByText(vacancy, { exact: true }).click();
    }

    async fillEmail(email: string) {
        await this.page.locator('label:text-is("Email")')
            .locator('xpath=../following-sibling::div//input')
            .fill(email);
    }

    async fillContactNumber(number: string) {
        await this.page.locator('label:text-is("Contact Number")')
            .locator('xpath=../following-sibling::div//input')
            .fill(number);
    }

    async uploadResume(path: string) {
        await this.fileInput.setInputFiles(path);
    }

    async fillKeywords(value: string) {
        await this.page.locator('label:text-is("Keywords")')
            .locator('xpath=../following-sibling::div//input')
            .fill(value);
    }

    async saveCandidate() {
        await this.saveButton.click();
    }
}