import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../core/base/BasePage";

export class LoginPage extends BasePage {
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly invalidCredentialErrorPopup: Locator;

    constructor(page: Page) {
        super(page);

        this.userNameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidCredentialErrorPopup = page.getByRole('alert');
    }

    async goToOrangeHRM() {
        await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`);
        await this.waitForPageLoad();
    }

    async loginOrangeHRM(username: string, password: string) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}