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