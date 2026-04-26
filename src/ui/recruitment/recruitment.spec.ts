import { test, expect } from '../../core/fixtures/hooks.fixture';
import { recruitmentTestData } from './recruitment.data';

test('[Recruitment] Add Candidate', {
    tag: ['@ui', '@recruitment', '@smoke', '@p1'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/Test-08'
    }
}, async ({ gotoUrl, leftNavigationPage, recruitmentPage }) => {

    const data = recruitmentTestData.candidate;

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
});