import { faker } from '@faker-js/faker';

type Employee = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export const createEmployeeData = (
    overrides: Partial<Employee> = {}
): Employee => {
    return {
        firstName: faker.person.firstName(),
        middleName: faker.person.firstName(),
        lastName: `${faker.person.lastName()}_${faker.string.numeric(4)}`,
        ...overrides
    };
};

export const pimTestData = {
    employeeIdToDelete: '0412',

    searchEmployee: {
        employeeName: 'Viyaan Adharv Sandra',
        employeeId: 'VA123',
        expectedRecordText: '(1) Record Found',
        expectedTableText: 'VA123Viyaan AdharvSandra'
    },

    editEmployee: {
        firstName: 'Lary',
        middleName: 'Maddy',
        lastName: 'Sandra',
        employeeId: 'VA1234',
        nationality: 'Indian',
        gender: 'Male',
        maritalStatus: 'Single',
        dob: '1998-04-07',
        bloodType: 'A+',
        customField: 'Tester',
        successMessage: 'Success'
    }
};