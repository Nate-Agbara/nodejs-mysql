const { createLogger, format, transports } = require('winston');

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

module.exports = logger;