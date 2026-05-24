import { chromium, firefox, webkit } from '@playwright/test';

import { executionConfig } from './execution.config';
import { lambdaTestConfig } from './lambdatest.config';

export class RemoteBrowserManager {

    static async getChromiumBrowser(capabilities: object) {

        if (executionConfig.isLambdaTest) {

            return await chromium.connect({
                wsEndpoint: `${lambdaTestConfig.wsEndpoint}?capabilities=${encodeURIComponent(
                    JSON.stringify(capabilities)
                )}`
            });
        }

        return await chromium.launch();
    }

    static async getFirefoxBrowser(capabilities: object) {

        if (executionConfig.isLambdaTest) {

            return await firefox.connect({
                wsEndpoint: `${lambdaTestConfig.wsEndpoint}?capabilities=${encodeURIComponent(
                    JSON.stringify(capabilities)
                )}`
            });
        }

        return await firefox.launch();
    }

    static async getWebkitBrowser(capabilities: object) {

        if (executionConfig.isLambdaTest) {

            return await webkit.connect({
                wsEndpoint: `${lambdaTestConfig.wsEndpoint}?capabilities=${encodeURIComponent(
                    JSON.stringify(capabilities)
                )}`
            });
        }

        return await webkit.launch();
    }
}