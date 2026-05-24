export const getWebkitCapabilities = (testName?: string) => ({
    browserName: 'pw-webKit',
    browserVersion: 'latest',

    'LT:Options': {
        platform: 'macOS Ventura',

        build: 'OrangeHRM Playwright Build',
        project: 'OrangeHRM Automation',

        name: testName || 'Webkit Tests',

        user: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,

        video: true,
        screenshot: true,
        console: true,
        network: true,
    }
});