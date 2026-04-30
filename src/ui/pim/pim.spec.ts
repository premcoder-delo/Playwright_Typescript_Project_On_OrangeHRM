import { test, expect } from '../../core/fixtures/hooks.fixture';
import { createEmployeeData, pimTestData } from './pim.data';
import { getLogger } from '../../core/logger/logger';


test('[PIM] Create employee in PIM', {
    tag: ['@ui', '@smoke', '@pim', '@p0', '@demo'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-04'
    }
}, async ({ gotoUrl, leftNavigationPage, pimPage, testLogger }, testInfo) => {

    const logger = getLogger(
        'pim',
        testInfo.title,
        testInfo.project.name
    );

    logger.info('Starting PIM Create Employee test');

    const employee = createEmployeeData();
    const fullName = `${employee.firstName} ${employee.lastName}`;

    logger.info(`Generated Employee: ${fullName}`);

    await leftNavigationPage.openPIMVerticalTab();
    await pimPage.addEmployee(employee.firstName, employee.middleName, employee.lastName);
    await pimPage.saveEmployeeAndWaitForDetails();

    await expect(pimPage.newEmployeeNameHeading).toHaveText(fullName);

    logger.info('PIM Create Employee test completed');
});

test('[PIM] Edit Employee Details', {
    tag: ['@ui', '@pim', '@regression', '@p1'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-07'
    }
}, async ({ gotoUrl, leftNavigationPage, pimPage, testLogger }, testInfo) => {

    const logger = getLogger(
        'pim',
        testInfo.title,
        testInfo.project.name
    );

    logger.info('Starting PIM Edit Employee test');

    const data = pimTestData.editEmployee;

    await leftNavigationPage.openPIMVerticalTab();
    await pimPage.clickFirstEditEmployee();

    logger.info(`Editing Employee ID: ${data.employeeId}`);

    await pimPage.updateEmployeeName(data.firstName, data.middleName, data.lastName);
    await pimPage.updateEmployeeId(data.employeeId);
    await pimPage.selectNationality(data.nationality);
    await pimPage.selectMaritalStatus(data.maritalStatus);
    await pimPage.updateDateOfBirth(data.dob);
    await pimPage.selectGender(data.gender);

    await pimPage.savePersonalDetails();

    await pimPage.selectBloodType(data.bloodType);
    await pimPage.fillCustomField(data.customField);
    await pimPage.saveCustomDetails();

    await expect(pimPage.successToast).toContainText(data.successMessage);

    logger.info('PIM Edit Employee test completed');
});

test('[PIM] Delete employee by ID', {
    tag: ['@ui', '@pim', '@regression', '@p1'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-05'
    }
}, async ({ gotoUrl, leftNavigationPage, pimPage, testLogger }, testInfo) => {

    const logger = getLogger(
        'pim',
        testInfo.title,
        testInfo.project.name
    );

    const employeeId = pimTestData.employeeIdToDelete;

    logger.info(`Starting Delete Employee test for ID: ${employeeId}`);

    await leftNavigationPage.openPIMVerticalTab();
    await pimPage.searchEmployeeByIdAndSelect(employeeId);
    await pimPage.deleteSelectedEmployee();

    await expect(pimPage.getEmployeeRow(employeeId)).toHaveCount(0);

    logger.info(`Employee deleted successfully: ${employeeId}`);
});

test('[PIM] Search Employee Details', {
    tag: ['@ui', '@pim', '@regression', '@p3'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-06'
    }
}, async ({ gotoUrl, leftNavigationPage, pimPage, testLogger }, testInfo) => {

    const logger = getLogger(
        'pim',
        testInfo.title,
        testInfo.project.name
    );

    const data = pimTestData.searchEmployee;

    logger.info(`Searching employee: ${data.employeeName}`);

    await leftNavigationPage.openPIMVerticalTab();
    await pimPage.searchEmployeeByName(data.employeeName);

    await expect(pimPage.resultSummary).toContainText(data.expectedRecordText);
    await expect(pimPage.resultTable).toContainText(data.expectedTableText);

    logger.info('Employee search completed successfully');
});