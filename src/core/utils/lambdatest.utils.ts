export async function updateLambdaTestStatus(
    page: any,
    status: 'passed' | 'failed',
    remark: string
) {
    await page.evaluate(
        () => { },
        `lambdatest_action: ${JSON.stringify({
            action: 'setTestStatus',
            arguments: {
                status,
                remark
            }
        })}`
    );
}