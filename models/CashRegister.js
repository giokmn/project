'use strict';  
// Strict mode for safer JS.

const { Model, DataTypes } = require('sequelize');  
// Imports Sequelize Model and DataTypes.

module.exports = (sequelize) => {  
  // Exports function to define CashRegister model.
  class CashRegister extends Model {  
    static associate(models) {  
      // Placeholder for associations.
    }
  }

  CashRegister.init(
    {
      DailyCash: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 }, // Required cash amount, defaults to 0.00.
    },
    {
      sequelize, // Sequelize instance.
    }
  );

  return CashRegister; // Returns CashRegister model.
};