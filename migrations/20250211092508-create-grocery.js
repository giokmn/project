'use strict';  
// Strict mode for safer JS.

const { DataTypes } = require('sequelize');  
// Imports Sequelize DataTypes.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Creates 'Groceries' table.
    await queryInterface.createTable('Groceries', {
      GroceryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }, // Auto-incrementing PK.
      Name: { type: DataTypes.STRING, allowNull: false }, // Required grocery name.
      Stock: { type: DataTypes.INTEGER, allowNull: false }, // Required stock quantity.
      Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Required price with 2 decimal places.
      createdAt: { type: DataTypes.DATE, allowNull: false }, // Creation timestamp.
      updatedAt: { type: DataTypes.DATE, allowNull: false }, // Update timestamp.
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drops 'Groceries' table.
    await queryInterface.dropTable('Groceries');
  },
};