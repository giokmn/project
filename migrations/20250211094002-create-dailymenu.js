'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');  // Imoprt DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DailyMenus', {
      DailyMenuId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'ProductId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Discount: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DailyMenus');
  },
};