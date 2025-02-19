'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Location extends Model {
    static associate(models) {
    }
  }

  Location.init(
    {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
    },
    {
      sequelize,
    }
  );

  return Location;
};