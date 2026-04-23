import { test, expect } from '../../core/fixtures/hooks.fixture';
import { loginData } from './login.data';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

test.describe('[Login Module] Negative Login Scenarios', () => {

    test('Invalid password', async ({ gotoUrl, loginPage, commonUtils }) => {
        const username = commonUtils.decryptData(process.env.APP_USERNAME!);

        await loginPage.loginOrangeHRM(username, loginData.invalid.password);

        await expect(loginPage.invalidCredentialErrorPopup)
            .toHaveText(loginData.invalid.errorMessage);

        await expect(loginPage.userNameInput).toBeVisible();
    });

    test('Invalid username', async ({ gotoUrl, loginPage, commonUtils }) => {
        const password = commonUtils.decryptData(process.env.APP_PASSWORD!);

        await loginPage.loginOrangeHRM(loginData.invalid.username, password);

        await expect(loginPage.invalidCredentialErrorPopup)
            .toHaveText(loginData.invalid.errorMessage);
    });

});

test('Valid login + visual checks', async ({ gotoUrl, loginPage, commonUtils, leftNavigationPage }) => {

    const username = commonUtils.decryptData(process.env.APP_USERNAME!);
    const password = commonUtils.decryptData(process.env.APP_PASSWORD!);

    await loginPage.loginOrangeHRM(username, password);

    await expect(leftNavigationPage.orangeHRMLogo)
        .toHaveScreenshot('orangeHRMBrandLogo.png');

    await expect(leftNavigationPage.leftNavigationTabs)
        .toHaveScreenshot('leftNavigationTabs.png');
});