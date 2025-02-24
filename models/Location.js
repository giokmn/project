'use strict';  
// Strict mode for safer JS.

const { Model, DataTypes } = require('sequelize');  
// Imports Sequelize Model and DataTypes.

module.exports = (sequelize) => {  
  // Exports function to define Location model.
  class Location extends Model {  
    static associate(models) {  
      // Placeholder for associations.
    }
  }

  Location.init(
    {
      Name: { type: DataTypes.STRING, allowNull: false }, // Required location name.
      Phone: { type: DataTypes.STRING }, // Optional phone number.
    },
    {
      sequelize, // Sequelize instance.
    }
  );

  return Location; // Returns Location model.
};