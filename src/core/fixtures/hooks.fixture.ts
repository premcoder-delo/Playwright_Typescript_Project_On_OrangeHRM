import { test as base } from './ui.fixture';
import { getLogger } from '../logger/logger';
import { updateLambdaTestStatus } from '../utils/lambdatest.utils';

type HooksFixtures = {
    gotoUrl: void;
    logout: void;
    testLogger: void;
};

export const test = base.extend<HooksFixtures>({

    // Auto logger for every test
    testLogger: [async ({ page }, use, testInfo) => {
        const logger = getLogger(
            'test',
            testInfo.title,
            testInfo.project.name
        );
        const start = Date.now();
        logger.info('TEST STARTED');
        await use();
        const duration = ((Date.now() - start) / 1000).toFixed(2);
        logger.info(`TEST ${testInfo.status?.toUpperCase()} - Duration: ${duration}s`);

        // LambdaTest reporting
        if (process.env.EXECUTION_ENV === 'lambdatest') {

            const status =
                testInfo.status === 'passed'
                    ? 'passed'
                    : 'failed';

            const remark =
                testInfo.status === 'passed'
                    ? `Test Passed in ${duration}s`
                    : testInfo.error?.message || 'Test Failed';

            await updateLambdaTestStatus(
                page,
                status,
                remark
            );
        }

    }, { auto: true }],

    gotoUrl: async ({ loginPage }, use) => {
        await loginPage.goToOrangeHRM();
        await use();
    },

    logout: async ({ userProfilePage, loginPage }, use) => {
        await use();
        await userProfilePage.logoutHRM();
        await loginPage.userNameInput.waitFor({ state: 'visible' });
    }

});

export { expect } from '@playwright/test';