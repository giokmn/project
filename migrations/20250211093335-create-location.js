'use strict';  
// Strict mode for safer JS.

const { DataTypes } = require('sequelize');  
// Imports Sequelize DataTypes.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Creates 'Locations' table.
    await queryInterface.createTable('Locations', {
      LocationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }, // Auto-incrementing PK.
      Name: { type: DataTypes.STRING, allowNull: false }, // Required location name.
      Phone: { type: DataTypes.STRING }, // Optional phone number.
      createdAt: { type: DataTypes.DATE, allowNull: false }, // Creation timestamp.
      updatedAt: { type: DataTypes.DATE, allowNull: false }, // Update timestamp.
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drops 'Locations' table.
    await queryInterface.dropTable('Locations');
  },
};