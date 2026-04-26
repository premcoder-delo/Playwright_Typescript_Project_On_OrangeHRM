import { faker } from '@faker-js/faker';

export const createCandidateData = () => {
    return {
        firstName: faker.person.firstName(),
        middleName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        vacancy: 'Senior QA Lead',
        email: faker.internet.email(),
        contactNumber: faker.string.numeric(10),
        resumePath: 'H:/Automation/Sample Resume For Upload.pdf',
        resumeFileName: 'Sample Resume For Upload.pdf',
        keywords: 'QA, Tester',
        expectedStatus: 'Status: Application Initiated'
    };
};

export const recruitmentTestData = {
    candidate: createCandidateData()
};