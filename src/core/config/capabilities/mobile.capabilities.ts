export const getIPhoneCapabilities = (testName?: string) => ({
    browserName: 'pw-webkit',

    'LT:Options': {
        platform: 'iOS 16',
        deviceName: 'iPhone 14 Pro',

        build: 'OrangeHRM Mobile Build',
        project: 'OrangeHRM Automation',

        name: testName || 'iOS Mobile Tests',

        user: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,

        isRealMobile: true
    }
});