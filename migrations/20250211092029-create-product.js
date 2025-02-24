'use strict';  
// Strict mode for safer JS.

const { DataTypes } = require('sequelize');  
// Imports Sequelize DataTypes.

module.exports = {
  async up (queryInterface, Sequelize) {
    // Creates 'Products' table.
    await queryInterface.createTable('Products', {
      ProductId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Auto-incrementing PK.
      Name: { type: DataTypes.STRING, allowNull: false }, // Required product name.
      MenuType: { type: DataTypes.ENUM('BBQ', 'Pizza', 'Dish', 'Salad', 'Dessert', 'Drink'), allowNull: false }, // Required menu type enum.
      PortionSize: { type: DataTypes.INTEGER, allowNull: false }, // Required portion size.
      createdAt: { type: DataTypes.DATE, allowNull: false }, // Creation timestamp.
      updatedAt: { type: DataTypes.DATE, allowNull: false }, // Update timestamp.
    });
  },

  async down (queryInterface, Sequelize) {
    // Drops 'Products' table.
    await queryInterface.dropTable('Products');
  }
};