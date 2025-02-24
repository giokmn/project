'use strict';  
// Strict mode for safer JS.

const { DataTypes } = require('sequelize');  
// Imports Sequelize DataTypes.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Creates 'ContactUsRecords' table.
    await queryInterface.createTable('ContactUsRecords', {
      Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }, // Auto-incrementing PK.
      CustomerId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'Customers', key: 'CustomerId' }, 
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      }, // Required FK to Customers.
      Message: { type: DataTypes.TEXT, allowNull: false }, // Required message content.
      DateSent: { type: DataTypes.DATE, allowNull: false }, // Required sent date.
      Status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Pending' }, // Required status, defaults to 'Pending'.
      Response: { type: DataTypes.TEXT, allowNull: true }, // Optional response text.
      createdAt: { type: DataTypes.DATE, allowNull: false }, // Creation timestamp.
      updatedAt: { type: DataTypes.DATE, allowNull: false }, // Update timestamp.
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drops 'ContactUsRecords' table.
    await queryInterface.dropTable('ContactUsRecords');
  },
};