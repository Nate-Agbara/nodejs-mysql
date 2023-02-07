import express from "express";
import mysql from "mysql2/promise";
import bodyParser from 'body-parser';

require('dotenv').config();
const knex = require('./db/knex');
const expressWinston = require('express-winston');
const {transports, format} = require('winston');

const logger = require('./logger');

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

app.get('/users', (req, res) => {
    knex.select().from('users').then(function(users){
        res.send(users)
    });
});

app.get('/users/:id', (req, res) => {
    knex.select()
        .from('users')
        .where('id', req.params.id)
        .then(function(users){
        res.send(users)
    });
    logger.info('This is an info log!');
    logger.warn('This is a warn log!');
});

app.post('/users', (req, res) => {
    knex('users').insert({
        name: req.body.name,
        email: req.body.email
    })
    .then(function(users){
        knex.select().from('users').then(function(users){
            res.send(users)
        });
    });
});

app.put('/users/:id', (req, res) => {
    knex('users').update({
        name: req.body.name,
        email: req.body.email
    })
    .where('id', req.params.id)
    .then(function(users){
        knex.select().from('users').then(function(users){
            res.send(users)
        });
    });
});

app.delete('/users/:id', (req, res) => {
    knex('users')
    .del()
    .where('id', req.params.id)
    .then(function(users){
        knex.select().from('users').then(function(users){
            res.send(users)
        });
    });
});


app.get('/', (req, res) => 
    res.send(`Node and express server is running on port ${PORT}`) );

app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`) );
