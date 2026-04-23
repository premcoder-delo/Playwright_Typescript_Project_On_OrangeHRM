import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.ENV_NAME
    ? `.env.${process.env.ENV_NAME}`
    : `.env.demo`;

dotenv.config({
    path: path.resolve(__dirname, `../../../env-files/${envFile}`)
});