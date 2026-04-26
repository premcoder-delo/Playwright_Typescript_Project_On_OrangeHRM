import { test as base } from '@playwright/test';

// UI Pages
import { LoginPage } from '../../ui/login/login.page';
import { DashboardPage } from '../../ui/common/dashboard.page';
import { UserProfilePage } from '../../ui/common/userProfile.page';
import { LeftNavigationPage } from '../../ui/common/leftNavigation.page';
import { PIMPage } from '../../ui/pim/pim.page';
import { RecruitmentPage } from '../../ui/recruitment/recruitment.page';

type PomFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    userProfilePage: UserProfilePage;
    leftNavigationPage: LeftNavigationPage;
    pimPage: PIMPage;
    recruitmentPage: RecruitmentPage
};

export const test = base.extend<PomFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    userProfilePage: async ({ page }, use) => {
        await use(new UserProfilePage(page));
    },
    leftNavigationPage: async ({ page }, use) => {
        await use(new LeftNavigationPage(page));
    },
    pimPage: async ({ page }, use) => {
        await use(new PIMPage(page));
    },
    recruitmentPage: async ({ page }, use) => {
        await use(new RecruitmentPage(page));
    },
});