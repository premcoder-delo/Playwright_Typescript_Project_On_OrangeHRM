import { test as base } from './ui.fixture';
import { getLogger } from '../logger/logger';

type HooksFixtures = {
    gotoUrl: void;
    logout: void;
    testLogger: void;
};

export const test = base.extend<HooksFixtures>({

    // Auto logger for every test
    testLogger: [async ({ }, use, testInfo) => {
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