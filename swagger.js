const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CRUD api',
            version: '1.0.0',
            description: 'Simple CRUD api with MySQL'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'development server'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'name of the user'
                        },
                        email: {
                            type: 'string',
                            description: 'email of the user'
                        }
                    },
                    example: {
                        name: 'test name',
                        email: 'test@yopmail.com'
                    }
                }
            },
            responses: {
                400: {
                    description: 'Missing api key - include it in the authorization header',
                    contents: 'application/json'
                },
                401: {
                    description: 'Unauthorized - incorrect api key or incorrect format',
                    contents: 'application/json'
                },
                404: {
                    description: 'Not found - no user found',
                    contents: 'application/json'
                }
            },
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            }
        },
        security: [{
            ApiKeyAuth: []
        }]
    },
    apis: ['./src/routes/userRoutes.js']
}

module.exports = options