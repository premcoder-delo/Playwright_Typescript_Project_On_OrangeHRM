import { test, expect } from '../core/fixtures/hooks.fixture';
import AxeBuilder from '@axe-core/playwright';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

test('[A11Y] Login Page Accessibility', {
    tag: ['@a11y', '@login', '@ui']
}, async ({ gotoUrl, page }) => {

    const results = await new AxeBuilder({ page }).analyze();

    // Fail only important issues
    const requiredViolations = results.violations.filter(
        violation =>
            violation.impact === 'critical' ||
            violation.impact === 'serious'
    );

    expect(
        requiredViolations,
        JSON.stringify(requiredViolations, null, 2)
    ).toEqual([]);
});