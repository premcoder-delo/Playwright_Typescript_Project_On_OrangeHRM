import { test, expect } from '../../core/fixtures/hooks.fixture';
import { recruitmentTestData } from './recruitment.data';
import { getLogger } from '../../core/logger/logger';


test('[Recruitment] Add Candidate', {
    tag: ['@ui', '@recruitment', '@smoke', '@p1'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-08'
    }
}, async ({ gotoUrl, leftNavigationPage, recruitmentPage, testLogger }, testInfo) => {

    const logger = getLogger(
        'recruitment',
        testInfo.title,
        testInfo.project.name
    );

    logger.info('Starting Recruitment Add Candidate test');

    const data = recruitmentTestData.candidate;

    logger.info(`Candidate Name: ${data.firstName} ${data.lastName}`);
    logger.info(`Candidate Email: ${data.email}`);

    await leftNavigationPage.openRecruitmentVerticalTab();
    await recruitmentPage.clickAddCandidate();

    await recruitmentPage.fillCandidateName(
        data.firstName,
        data.middleName,
        data.lastName
    );

    await recruitmentPage.selectVacancy(data.vacancy);
    await recruitmentPage.fillEmail(data.email);
    await recruitmentPage.fillContactNumber(data.contactNumber);
    await recruitmentPage.uploadResume(data.resumePath);

    await expect(recruitmentPage.uploadedFileName)
        .toContainText(data.resumeFileName);

    await recruitmentPage.fillKeywords(data.keywords);
    await recruitmentPage.saveCandidate();

    await expect(recruitmentPage.statusLabel)
        .toBeVisible();

    logger.info('Recruitment Add Candidate completed successfully');
});