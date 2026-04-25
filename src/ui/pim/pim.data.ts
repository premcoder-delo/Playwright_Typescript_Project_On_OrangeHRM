type Employee = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export const createEmployeeData = (overrides: Partial<Employee> = {}): Employee => {
    return {
        firstName: 'Test',
        middleName: 'Auto',
        lastName: `User_${Date.now()}`,
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