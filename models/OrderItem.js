'use strict';  
// Strict mode for safer JS.

const { Model, DataTypes } = require('sequelize');  
// Imports Sequelize Model and DataTypes.

module.exports = (sequelize) => {  
  // Exports function to define OrderItem model.
  class OrderItem extends Model {  
    static associate(models) {  
      // Defines model associations.
      OrderItem.belongsTo(models.Order, { foreignKey: 'OrderId', onDelete: 'CASCADE' }); // N:1 with Order.
      OrderItem.belongsTo(models.Product, { foreignKey: 'ProductId' }); // N:1 with Product.
    }
  }

  OrderItem.init(
    {
      OrderId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'Order', key: 'OrderId' } 
      }, // Required FK to Order.
      ProductId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'Product', key: 'ProductId' } 
      }, // Required FK to Product.
      Quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }, // Required quantity, defaults to 1.
      Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Required price with 2 decimals.
    },
    {
      sequelize, // Sequelize instance.
    }
  );

  return OrderItem; // Returns OrderItem model.
};