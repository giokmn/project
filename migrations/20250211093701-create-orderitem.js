'use strict';  
// Strict mode for safer JS.

const { DataTypes } = require('sequelize');  
// Imports Sequelize DataTypes.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Creates 'OrderItems' table.
    await queryInterface.createTable('OrderItems', {
      OrderItemId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }, // Auto-incrementing PK.
      OrderId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'Orders', key: 'OrderId' }, 
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      }, // Required FK to Orders.
      ProductId: { 
        type: DataTypes.INTEGER, 
        allowNull: true, 
        references: { model: 'Products', key: 'ProductId' }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      }, // Optional FK to Products.
      Quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }, // Required quantity, defaults to 1.
      Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Required price.
      createdAt: { type: DataTypes.DATE, allowNull: false }, // Creation timestamp.
      updatedAt: { type: DataTypes.DATE, allowNull: false }, // Update timestamp.
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drops 'OrderItems' table.
    await queryInterface.dropTable('OrderItems');
  },
};