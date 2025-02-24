'use strict';  
// Strict mode for safer JS.

const { Model, DataTypes } = require('sequelize');  
// Imports Sequelize Model and DataTypes.

module.exports = (sequelize) => {  
  // Exports function to define Order model.
  class Order extends Model {  
    static associate(models) {  
      // Defines model associations.
      Order.belongsTo(models.Customer, { foreignKey: 'CustomerId' }); // N:1 with Customer.
      Order.belongsTo(models.Payment, { foreignKey: 'PaymentId' }); // N:1 with Payment.
      Order.hasMany(models.OrderItem, { foreignKey: 'OrderId', onDelete: 'CASCADE' }); // 1:N with OrderItem.
    }
  }

  Order.init(
    {
      CustomerId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'Customer', key: 'CustomerId' } 
      }, // Required FK to Customer.
      PaymentId: { 
        type: DataTypes.INTEGER, 
        allowNull: true, 
        references: { model: 'Payment', key: 'PaymentId' } 
      }, // Optional FK to Payment.
      TotalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Required total price with 2 decimals.
    },
    {
      sequelize, // Sequelize instance.
    }
  );

  return Order; // Returns Order model.
};