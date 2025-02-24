'use strict';  
// Strict mode for safer JS.

const { DataTypes } = require('sequelize');  
// Imports Sequelize DataTypes.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Creates 'DailyMenus' table.
    await queryInterface.createTable('DailyMenus', {
      DailyMenuId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false }, // Auto-incrementing PK.
      ProductId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'Products', key: 'ProductId' }, 
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      }, // Required FK to Products.
      Discount: { type: DataTypes.DECIMAL(5, 2), allowNull: false }, // Required discount with 2 decimal places.
      createdAt: { type: DataTypes.DATE, allowNull: false }, // Creation timestamp.
      updatedAt: { type: DataTypes.DATE, allowNull: false }, // Update timestamp.
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drops 'DailyMenus' table.
    await queryInterface.dropTable('DailyMenus');
  },
};