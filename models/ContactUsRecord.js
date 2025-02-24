'use strict';  
// Strict mode for safer JS.

const { Model, DataTypes } = require('sequelize');  
// Imports Sequelize Model and DataTypes.

module.exports = (sequelize) => {  
  // Exports function to define ContactUsRecord model.
  class ContactUsRecord extends Model {  
    static associate(models) {  
      // Defines model associations.
      ContactUsRecord.belongsTo(models.Customer, { foreignKey: 'CustomerId' }); // N:1 with Customer.
    }
  }

  ContactUsRecord.init(
    {
      CustomerId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'Customer', key: 'CustomerId' } 
      }, // Required FK to Customer.
      Message: { type: DataTypes.TEXT, allowNull: false }, // Required message content.
      DateSent: { type: DataTypes.DATE, allowNull: false }, // Required sent date.
      Status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Pending' }, // Required status, defaults to 'Pending'.
      Response: { type: DataTypes.TEXT, allowNull: true }, // Optional response text.
    },
    {
      sequelize, // Sequelize instance.
    }
  );

  return ContactUsRecord; // Returns ContactUsRecord model.
};