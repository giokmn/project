'use strict';  
// Strict mode for safer JS.

require('dotenv').config();  
// Loads environment variables from .env file.
const fs = require('fs');  
// Imports filesystem module.
const path = require('path');  
// Imports path module for file paths.
const Sequelize = require('sequelize');  
// Imports Sequelize ORM.
const basename = path.basename(__filename);  
// Gets current file name.
const db = {};  
// Empty object to store models.

const config = {  
  // Database connection config from env vars.
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
};

const sequelize = new Sequelize(  
  // Initializes Sequelize instance.
  config.database,
  config.username,
  config.password,
  config
);

fs  
  .readdirSync(__dirname)  
  // Reads all files in current directory.
  .filter(file => {  
    // Filters for .js model files, excludes this file.
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {  
    // Loads each model file.
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model; // Adds model to db object.
  });

Object.keys(db).forEach(modelName => {  
  // Sets up associations for each model.
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // Adds Sequelize instance to db.
db.Sequelize = Sequelize; // Adds Sequelize class to db.

module.exports = db; // Exports db object with models.