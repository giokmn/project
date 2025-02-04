'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Grocery extends Model {
    static associate(models) {
    
    }
  }

  Grocery.init(
    {
      GroceryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Price: {
        type: DataTypes.DECIMAL(10, 2), // Tip za cenu
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Grocery',
      timestamps: true,
    }
  );

  return Grocery;
};