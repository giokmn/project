require('dotenv').config();  // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  },
  test: {
    username: process.env.DATABASE_USER_TEST,
    password: process.env.DATABASE_PASSWORD_TEST,
    database: process.env.DATABASE_NAME_TEST,
    host: process.env.DATABASE_HOST_TEST,
    dialect: process.env.DATABASE_DIALECT_TEST,
  },
  production: {
    username: process.env.DATABASE_USER_PROD,
    password: process.env.DATABASE_PASSWORD_PROD,
    database: process.env.DATABASE_NAME_PROD,
    host: process.env.DATABASE_HOST_PROD,
    dialect: process.env.DATABASE_DIALECT_PROD,
  }
};