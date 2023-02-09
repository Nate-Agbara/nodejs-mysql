import express from "express";
import mysql from "mysql2/promise";
import bodyParser from 'body-parser';
import { errorHandler } from "./errorHandler";

require('dotenv').config();
const knex = require('./db/knex');
const expressWinston = require('express-winston');
const {transports, format} = require('winston');

const logger = require('./logger');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const options = require('./swagger');

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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints to manage users
 * 
 */

/**
 * @swagger
 *   /users:
 *     get:
 *       summary: Get all users
 *       tags: [Users]
 *       responses:
 *         "200":
 *           description: The list of users
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 * 
 */
app.get('/users', (req, res) => {
    knex.select().from('users').then(function(users){
        res.send(users)
    });
});

/**
 * @swagger
 *   /users/{id}:
 *     get:
 *       summary: Get a user by id
 *       tags: [Users]
 *       parameters: 
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: id of a book
 *       responses:
 *         "200":
 *           description: The list of users
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "404":
 *           $ref: '#/components/responses/404'
 * 
 */
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


/**
 * @swagger
 *   /users:
 *     post:
 *       summary: Create a user
 *       tags: [Users]
 *       requestBody:
 *           required: true
 *           content: 
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "201":
 *           description: User created successfully
 *           contents: 
 *             application/json
 * 
 */
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

/**
 * @swagger
 *   /users/{id}:
 *     patch:
 *       summary: Get a user by id
 *       tags: [Users]
 *       parameters: 
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: id of a book
 *       requestBody:
 *           required: true
 *           content: 
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *                 required:
 *       responses:
 *         "204":
 *           description: User updated successfully
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "404":
 *           $ref: '#/components/responses/404'
 * 
 */
app.patch('/users/:id', (req, res) => {
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

/**
 * @swagger
 *   /users/{id}:
 *     delete:
 *       summary: Delete a user by id
 *       tags: [Users]
 *       parameters: 
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: id of a book
 *       responses:
 *         "200":
 *           description: User deleted successfully
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "404":
 *           $ref: '#/components/responses/404'
 * 
 */
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

app.get('/error', (req, res) => {
    throw new Error('this is a custom error') 
});

app.get('/', (req, res) => 
    res.send(`Node and express server is running on port ${PORT}`) );

app.use(errorHandler)

//swagger setup
const specs = swaggerJSDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`) );
