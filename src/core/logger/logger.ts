import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = 'reports/logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

export const getLogger = (moduleName: string) => {
    return winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf(({ timestamp, level, message }) =>
                `${timestamp} [${moduleName.toUpperCase()}] ${level.toUpperCase()} - ${message}`
            )
        ),
        transports: [
            new winston.transports.Console(),

            new winston.transports.File({
                filename: path.join(logDir, `${moduleName}.log`)
            })
        ]
    });
};