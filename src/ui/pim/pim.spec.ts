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

test('[PIM] Edit Employee Details', {
    tag: ['@ui', '@pim', '@regression', '@p1'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-07'
    }
}, async ({ gotoUrl, leftNavigationPage, pimPage }) => {

    const data = pimTestData.editEmployee;

    await leftNavigationPage.openPIMVerticalTab();
    await pimPage.clickFirstEditEmployee();
    await pimPage.updateEmployeeName(
        data.firstName,
        data.middleName,
        data.lastName
    );

    await pimPage.updateEmployeeId(data.employeeId);

    await pimPage.selectNationality(data.nationality);
    await pimPage.selectMaritalStatus(data.maritalStatus);
    await pimPage.updateDateOfBirth(data.dob);
    await pimPage.selectGender(data.gender);

    await pimPage.savePersonalDetails();

    await pimPage.selectBloodType(data.bloodType);
    await pimPage.fillCustomField(data.customField);

    await pimPage.saveCustomDetails();

    await expect(pimPage.successToast)
        .toContainText(data.successMessage);
});

test('[PIM] Delete employee by ID', {
    tag: ['@ui', '@pim', '@regression', '@p1'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-05'
    }
}, async ({ gotoUrl, leftNavigationPage, pimPage }) => {

    const employeeId = pimTestData.employeeIdToDelete;

    await leftNavigationPage.openPIMVerticalTab();
    await pimPage.searchEmployeeByIdAndSelect(employeeId);
    await pimPage.deleteSelectedEmployee();
    await expect(pimPage.getEmployeeRow(employeeId)).toHaveCount(0);
});

test('[PIM] Search Employee Details', {
    tag: ['@ui', '@pim', '@regression', '@p3'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-06'
    }
}, async ({ gotoUrl, leftNavigationPage, pimPage }) => {

    const data = pimTestData.searchEmployee;

    await leftNavigationPage.openPIMVerticalTab();
    await pimPage.searchEmployeeByName(data.employeeName);

    await expect(pimPage.resultSummary)
        .toContainText(data.expectedRecordText);

    await expect(pimPage.resultTable)
        .toContainText(data.expectedTableText);
});


