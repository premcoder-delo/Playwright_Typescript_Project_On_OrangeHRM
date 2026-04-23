import { test as base } from './pom.fixture';
import CommonUtils from '../utils/CommonUtils';

type UIFixtures = {
    commonUtils: CommonUtils;
};

export const test = base.extend<UIFixtures>({
    commonUtils: async ({ }, use) => {
        await use(new CommonUtils());
    }
});