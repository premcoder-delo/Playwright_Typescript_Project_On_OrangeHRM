import fs from 'fs';
import { getLogger } from '../logger/logger';

const logger = getLogger('teardown');

async function globalTeardown() {
    logger.info('Starting Global Teardown');

    const files = [
        './playwright/.auth/auth.json',
        './playwright/.auth/ios-auth.json',
        './playwright/.auth/android-auth.json'
    ];

    for (const file of files) {
        try {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
                logger.info(`Deleted auth file: ${file}`);
            }
        } catch (error) {
            logger.error(`Failed to delete ${file}`);
        }
    }

    logger.info('Global Teardown Completed');
}

export default globalTeardown;