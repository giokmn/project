'use strict';  
// Strict mode for safer JS.

const { DataTypes } = require('sequelize');  
// Imports Sequelize DataTypes.

module.exports = {
  async up (queryInterface, Sequelize) {
    // Creates 'Payments' table.
    await queryInterface.createTable('Payments', {
      PaymentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Auto-incrementing PK.
      Name: { type: DataTypes.STRING, allowNull: true }, // Optional payment name.
      createdAt: { type: DataTypes.DATE, allowNull: false }, // Creation timestamp.
      updatedAt: { type: DataTypes.DATE, allowNull: false }, // Update timestamp.
    });
  },

  async down (queryInterface, Sequelize) {
    // Drops 'Payments' table.
    await queryInterface.dropTable('Payments');
  }
};