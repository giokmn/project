'use strict';  
// Strict mode for safer JS.

const { DataTypes } = require('sequelize');  
// Imports Sequelize DataTypes.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Creates 'Orders' table.
    await queryInterface.createTable('Orders', {
      OrderId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }, // Auto-incrementing PK.
      CustomerId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'Customers', key: 'CustomerId' }, 
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      }, // Required FK to Customers.
      PaymentId: { 
        type: DataTypes.INTEGER, 
        allowNull: true, 
        references: { model: 'Payments', key: 'PaymentId' }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      }, // Optional FK to Payments.
      TotalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Required total price.
      createdAt: { type: DataTypes.DATE, allowNull: false }, // Creation timestamp.
      updatedAt: { type: DataTypes.DATE, allowNull: false }, // Update timestamp.
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drops 'Orders' table.
    await queryInterface.dropTable('Orders');
  },
};