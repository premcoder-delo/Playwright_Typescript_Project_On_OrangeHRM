import { test, expect } from '../../core/fixtures/hooks.fixture';
import { createEmployeeData } from './pim.data';

test('Create employee in PIM', async ({ gotoUrl, leftNavigationPage, pimPage }) => {

    const employee = createEmployeeData();
    const fullName = `${employee.firstName} ${employee.lastName}`;

    await leftNavigationPage.openPIMVerticalTab();

    await pimPage.addEmployee(
        employee.firstName,
        employee.middleName,
        employee.lastName
    );

    await pimPage.saveEmployeeAndWaitForDetails();

    await expect(pimPage.newEmployeeNameHeading)
        .toHaveText(fullName);
});