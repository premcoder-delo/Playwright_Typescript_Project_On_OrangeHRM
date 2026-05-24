export const getChromiumCapabilities = (testName?: string) => ({
    browserName: 'pw-chromium',
    browserVersion: 'latest',

    'LT:Options': {
        platform: 'Windows 11',

        build: 'OrangeHRM Playwright Build',
        project: 'OrangeHRM Automation',

        name: testName || 'Chromium Tests',

        user: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,

        video: true,
        screenshot: true,
        console: true,
        network: true,
    }
});