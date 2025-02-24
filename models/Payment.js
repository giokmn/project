'use strict';  
// Strict mode for safer JS.

const { Model, DataTypes } = require('sequelize');  
// Imports Sequelize Model and DataTypes.

module.exports = (sequelize) => {  
  // Exports function to define Payment model.
  class Payment extends Model {  
    static associate(models) {  
      // Defines model associations.
      Payment.hasMany(models.Order, { foreignKey: 'PaymentId' }); // 1:N with Order.
    }
  }

  Payment.init(
    {
      Name: { type: DataTypes.STRING }, // Optional payment name.
    },
    {
      sequelize, // Sequelize instance.
    }
  );

  return Payment; // Returns Payment model.
};