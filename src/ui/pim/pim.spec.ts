import { test, expect } from '../../core/fixtures/hooks.fixture';
import { createEmployeeData } from './pim.data';
import { pimTestData } from './pim.data';

test('[PIM] Create employee in PIM', {
    tag: ['@ui', '@smoke', '@pim', '@p0', '@demo'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-04'
    }
}, async ({ gotoUrl, leftNavigationPage, pimPage }) => {

    const employee = createEmployeeData();
    const fullName = `${employee.firstName} ${employee.lastName}`;

    await leftNavigationPage.openPIMVerticalTab();
    await pimPage.addEmployee(employee.firstName, employee.middleName, employee.lastName);
    await pimPage.saveEmployeeAndWaitForDetails();
    await expect(pimPage.newEmployeeNameHeading).toHaveText(fullName);
});

test('[PIM] Delete employee by ID', {
    tag: ['@ui', '@pim', '@regression', '@p1'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-05'
    }
}, async ({ gotoUrl, leftNavigationPage, pimPage }) => {

    const employeeId = pimTestData.employeeId;

    await leftNavigationPage.openPIMVerticalTab();
    await pimPage.searchEmployeeByIdAndSelect(employeeId);
    await pimPage.deleteSelectedEmployee();
    await expect(pimPage.getEmployeeRow(employeeId)).toHaveCount(0);
});