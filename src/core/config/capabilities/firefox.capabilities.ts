export const getFirefoxCapabilities = (testName?: string) => ({
    browserName: 'pw-firefox',
    browserVersion: 'latest',

    'LT:Options': {
        platform: 'Windows 11',

        build: 'OrangeHRM Playwright Build',
        project: 'OrangeHRM Automation',

        name: testName || 'Firefox Tests',

        user: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,

        video: true,
        screenshot: true,
        console: true,
        network: true
    }
});