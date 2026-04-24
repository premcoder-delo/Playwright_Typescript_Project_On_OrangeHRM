import { test, expect } from '../../core/fixtures/hooks.fixture';
import { loginData } from './login.data';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

test.describe('[Login] Negative Login Scenarios', {
    tag: ['@ui', '@regression', '@login', '@p1'],
    annotation: {
        type: 'Story Link',
        description: 'https://jiraticket/Story-01'
    }
}, () => {

    test('[Login] Invalid password', {
        annotation: {
            type: 'Test Case Link',
            description: 'https://jiraticket/Test-01'
        }
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
        const username = commonUtils.decryptData(process.env.APP_USERNAME!);

        await loginPage.loginOrangeHRM(username, loginData.invalid.password);

        await expect(loginPage.invalidCredentialErrorPopup)
            .toHaveText(loginData.invalid.errorMessage);

        await expect(loginPage.userNameInput).toBeVisible();
    });

    test('[Login] Invalid username', {
        annotation: {
            type: 'Test Case Link',
            description: 'https://jiraticket/Test-02'
        }
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
        const password = commonUtils.decryptData(process.env.APP_PASSWORD!);

        await loginPage.loginOrangeHRM(loginData.invalid.username, password);

        await expect(loginPage.invalidCredentialErrorPopup)
            .toHaveText(loginData.invalid.errorMessage);
    });

});

test('[Login] Valid login + visual checks', {
    tag: ['@ui', '@smoke', '@login', '@p0', '@demo', '@qa', '@trunk'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-03'
    }
}, async ({ gotoUrl, loginPage, commonUtils, leftNavigationPage }) => {

    const username = commonUtils.decryptData(process.env.APP_USERNAME!);
    const password = commonUtils.decryptData(process.env.APP_PASSWORD!);

    await loginPage.loginOrangeHRM(username, password);

    await expect(leftNavigationPage.orangeHRMLogo)
        .toHaveScreenshot('orangeHRMBrandLogo.png');

    await expect(leftNavigationPage.leftNavigationTabs)
        .toHaveScreenshot('leftNavigationTabs.png');
});