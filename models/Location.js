'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Location extends Model {
    static associate(models) {
    }
  }

  Location.init(
    {
      LocationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
      modelName: 'Location',
      timestamps: true, 
    }
  );

  return Location;
};