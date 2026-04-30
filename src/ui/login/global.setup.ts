import { test, expect } from '../../core/fixtures/hooks.fixture';
import { cleanFolder } from '../../core/utils/fileUtils';

test('global setup for auto login', async ({
    page,
    loginPage,
    commonUtils,
    dashboardPage
}) => {

    // Clean logs before execution starts
    cleanFolder('reports/logs');
    cleanFolder('test-results')
    cleanFolder('reports/allure-results')
    cleanFolder('temp')

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