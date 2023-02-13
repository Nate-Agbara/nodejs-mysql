import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'warn',
            filename: 'logs/logwarnings.log'
        }),
        new transports.File({
            level: 'error',
            filename: 'logs/logerrors.log'
        }),
        new transports.File({
            level: 'info',
            filename: 'logs/loginfo.log'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    )
})

export default logger;