require('dotenv').config();

//update with your config settings
module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        },
        migrations: {
            directory: __dirname + '/mysql/db/migrations',
        },
        seeds: {
            directory: __dirname + '/mysql/db/seeds',
        }
    },
    production: {
        client: 'mysql2',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/mysql/db/migrations',
        },
        seeds: {
            directory: __dirname + '/mysql/db/seeds',
        }
    }
}