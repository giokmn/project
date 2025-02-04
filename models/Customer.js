'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Order, { foreignKey: 'CustomerId', onDelete: 'CASCADE' });
      Customer.hasMany(models.ContactUsRecord, { foreignKey: 'CustomerId' });
    }
  }

  Customer.init(
    {
      CustomerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserName:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DeliveryAddress:{
        type:DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
      timestamps: true, //adds created at and updated at columns
    }
  );

  return Customer;
};