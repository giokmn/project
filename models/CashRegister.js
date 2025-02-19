'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CashRegister extends Model {
    static associate(models) {
   
    }
  }

  CashRegister.init(
    {
      DailyCash: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false, 
        defaultValue: 0.00, 
      },
    },
    {
      sequelize,
    }
  );

  return CashRegister;
};