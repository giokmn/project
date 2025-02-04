'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CashRegister extends Model {
    static associate(models) {
   
    }
  }

  CashRegister.init(
    {
      RegisterId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      DailyCash: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false, 
        defaultValue: 0.00, 
      },
    },
    {
      sequelize,
      modelName: 'CashRegister',
      timestamps: true,
    }
  );

  return CashRegister;
};