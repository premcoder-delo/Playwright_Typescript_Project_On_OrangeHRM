import { test, expect } from '../../core/fixtures/hooks.fixture';
import { createEmployeeData } from './pim.data';
import { EmployeeRepo } from '../../core/db/employee.repo';

test('[DB][PIM] Create employee and store in SQLite', {
    tag: ['@db', '@ui', '@pim', '@p1'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-DB-01'
    }
}, async ({ gotoUrl, leftNavigationPage, pimPage }) => {

    const employee = createEmployeeData();

    const fullName = `${employee.firstName} ${employee.lastName}`;

    // UI Flow
    await leftNavigationPage.openPIMVerticalTab();

    await pimPage.addEmployee(
        employee.firstName,
        employee.middleName,
        employee.lastName
    );

    await pimPage.saveEmployeeAndWaitForDetails();

    await expect(pimPage.newEmployeeNameHeading)
        .toHaveText(fullName);

    // Save into DB
    const empId = Date.now().toString();

    EmployeeRepo.save(
        empId,
        employee.firstName,
        employee.lastName
    );

    // Read from DB
    const row = EmployeeRepo.getLatestByFirstName(
        employee.firstName
    ) as any;

    expect(row.empId).toBe(empId);
    expect(row.firstName).toBe(employee.firstName);
    expect(row.lastName).toBe(employee.lastName);
});