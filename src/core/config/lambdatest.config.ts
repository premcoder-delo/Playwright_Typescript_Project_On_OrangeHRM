export const lambdaTestConfig = {
    username: process.env.LT_USERNAME!,
    accessKey: process.env.LT_ACCESS_KEY!,
    gridUrl: process.env.LT_GRID_URL!,

    buildName: 'OrangeHRM Playwright Framework',
    projectName: 'OrangeHRM Automation',

    get wsEndpoint() {
        return `wss://${this.username}:${this.accessKey}@cdp.lambdatest.com/playwright`;
    }
};