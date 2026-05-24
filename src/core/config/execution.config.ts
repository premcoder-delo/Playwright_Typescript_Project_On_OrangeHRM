export const executionConfig = {
    isLambdaTest: process.env.EXECUTION_ENV === 'lambdatest',
    isLocal: process.env.EXECUTION_ENV === 'local',
};