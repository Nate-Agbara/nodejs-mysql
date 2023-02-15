import express from "express";
import bodyParser from 'body-parser';
import routes from './src/routes/userRoutes.js';

require('dotenv').config();
const expressWinston = require('express-winston');
const {transports, format} = require('winston');

const logger = require('./logger').default;
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const options = require('./swagger');
const errorHandler = require('./errorHandler');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

//logger setup
app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))

const myFormat = format.printf(({level, meta, timestamp}) => {
    return `${timestamp} ${level}: ${meta.message}`
});

app.use(expressWinston.errorLogger({
    transports: [
        new transports.File({
            filename: 'logs/logInternalErrors.log'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        myFormat
    )
}))

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// eslint-disable-next-line no-unused-vars
app.get('/error', (req, res) => {
    throw new Error('this is a custom error')
});

routes(app);

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`) );

app.use(errorHandler)

//swagger setup
const specs = swaggerJSDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`) );
