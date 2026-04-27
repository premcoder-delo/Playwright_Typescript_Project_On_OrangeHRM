import { test, expect } from '../../core/fixtures/hooks.fixture';

test('mobile global setup for auto login', async ({
    page,
    loginPage,
    commonUtils,
    dashboardPage
}, testInfo) => {

    const username = commonUtils.decryptData(process.env.APP_USERNAME!);
    const password = commonUtils.decryptData(process.env.APP_PASSWORD!);

    await loginPage.goToOrangeHRM();
    await loginPage.loginOrangeHRM(username, password);

    await page.waitForURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);

    await expect(dashboardPage.dashboardTitleText)
        .toContainText('Dashboard');

    const authMap: Record<string, string> = {
        'ios-setup': './playwright/.auth/ios-auth.json',
        'android-setup': './playwright/.auth/android-auth.json',
    };

    await page.context().storageState({
        path: authMap[testInfo.project.name]
    });
});