'use strict';  
// Strict mode for safer JS.

const { DataTypes } = require('sequelize');  
// Imports Sequelize DataTypes.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Creates 'CashRegisters' table.
    await queryInterface.createTable('CashRegisters', {
      RegisterId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }, // Auto-incrementing PK.
      DailyCash: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 }, // Required cash amount, defaults to 0.00.
      createdAt: { type: DataTypes.DATE, allowNull: false }, // Creation timestamp.
      updatedAt: { type: DataTypes.DATE, allowNull: false }, // Update timestamp.
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drops 'CashRegisters' table.
    await queryInterface.dropTable('CashRegisters');
  },
};