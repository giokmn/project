'use strict';  
// Strict mode for safer JS.

const { Model, DataTypes } = require('sequelize');  
// Imports Sequelize Model and DataTypes.

module.exports = (sequelize) => {  
  // Exports function to define Grocery model.
  class Grocery extends Model {  
    static associate(models) {  
      // Placeholder for associations.
    }
  }

  Grocery.init(
    {
      Name: { type: DataTypes.STRING, allowNull: false }, // Required grocery name.
      Stock: { type: DataTypes.INTEGER, allowNull: false }, // Required stock quantity.
      Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Required price with 2 decimals.
    },
    {
      sequelize, // Sequelize instance.
    }
  );

  return Grocery; // Returns Grocery model.
};