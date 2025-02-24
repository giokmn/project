'use strict';  
// Strict mode for safer JS.

const { DataTypes } = require('sequelize');  
// Imports Sequelize DataTypes.

module.exports = {
  async up (queryInterface, Sequelize) {
    // Creates 'Customers' table.
    await queryInterface.createTable('Customers', {
      CustomerId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Auto-incrementing PK.
      FirstName: { type: DataTypes.STRING, allowNull: false }, // Required first name.
      LastName: { type: DataTypes.STRING, allowNull: false }, // Required last name.
      UserName: { type: DataTypes.STRING, allowNull: false }, // Required username.
      Password: { type: DataTypes.STRING, allowNull: false }, // Required password.
      Phone: { type: DataTypes.STRING, allowNull: false }, // Required phone.
      DeliveryAddress: { type: DataTypes.STRING }, // Optional delivery address.
      createdAt: { type: DataTypes.DATE, allowNull: false }, // Creation timestamp.
      updatedAt: { type: DataTypes.DATE, allowNull: false }, // Update timestamp.
    });
  },

  async down (queryInterface, Sequelize) {
    // Drops 'Customers' table.
    await queryInterface.dropTable('Customers');
  }
};