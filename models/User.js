"use strict";  
// Strict mode for safer JS.

const { Model, DataTypes } = require("sequelize");  
// Imports Sequelize Model and DataTypes.
const bcrypt = require("bcrypt");  
// Imports bcrypt for password hashing.

module.exports = (sequelize) => {
  // Exports function to define User model.
  class User extends Model {
    static associate(models) {  
      // Placeholder for associations (e.g., with other models).
    }
  }

  User.init(
    {
      FirstName: { type: DataTypes.STRING, allowNull: false }, // Required first name.
      LastName: { type: DataTypes.STRING, allowNull: false }, // Required last name.
      UserName: { type: DataTypes.STRING, allowNull: false }, // Required username.
      Password: { type: DataTypes.STRING, allowNull: false }, // Required password (hashed).
      DateBirth: { type: DataTypes.DATE, allowNull: false }, // Required birth date.
      Email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
        validate: { isEmail: true, notNull: { msg: "Email is required." } } 
      }, // Required unique email with validation.
      Phone: { type: DataTypes.STRING, allowNull: false }, // Required phone.
      Role: { type: DataTypes.ENUM("Manager", "Owner", "Chef"), allowNull: false }, // Required role enum.
      HireDate: { type: DataTypes.DATE, allowNull: false }, // Required hire date.
    },
    {
      sequelize, // Sequelize instance.
      hooks: {
        beforeCreate: async (user) => {  
          // Hashes password before creating user.
          const salt = await bcrypt.genSalt(10);
          user.Password = await bcrypt.hash(user.Password, salt);
        },
        beforeUpdate: async (user) => {  
          // Hashes password before update if changed.
          if (user.changed("Password")) {
            const salt = await bcrypt.genSalt(10);
            user.Password = await bcrypt.hash(user.Password, salt);
          }
        },
      },
    }
  );

  return User; // Returns User model.
};