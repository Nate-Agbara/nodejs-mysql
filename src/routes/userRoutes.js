import { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } from "../controller/userController";

const routes = (app) => {
    app.route('/users')

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
    .get((req, res, next) => {
        //middleware
        console.log(`Request from ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getAllUsers)

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
    .post(createUser);

    app.route('/users/:id')

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
    .get(getUserById)

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
    .patch(updateUserById)

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
    .delete(deleteUserById)

    // app.route('/auth/register')
    // .post(register)

    // app.route('/login')
    // .post(login)
}

export default routes;