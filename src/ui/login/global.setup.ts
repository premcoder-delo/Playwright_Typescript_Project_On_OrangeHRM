import { test, expect } from '../../core/fixtures/hooks.fixture';

test('global setup for auto login', async ({ page, loginPage, commonUtils, dashboardPage }) => {

    const username = commonUtils.decryptData(process.env.APP_USERNAME!);
    const password = commonUtils.decryptData(process.env.APP_PASSWORD!);

    await loginPage.goToOrangeHRM();
    await loginPage.loginOrangeHRM(username, password);

    await page.waitForURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);

    await expect(dashboardPage.dashboardTitleText)
        .toContainText('Dashboard');

    await page.context().storageState({
        path: './playwright/.auth/auth.json'
    });
});