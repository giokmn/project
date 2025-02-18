'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Grocery extends Model {
    static associate(models) {
    
    }
  }

  Grocery.init(
    {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
    }
  );

  return Grocery;
};