import { test as base } from './ui.fixture';

type HooksFixtures = {
    gotoUrl: void;
    logout: void;
};

export const test = base.extend<HooksFixtures>({
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