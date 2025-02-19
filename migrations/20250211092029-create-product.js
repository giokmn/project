'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');  // Imoprt DataTypes
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      ProductId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MenuType: {
      type: DataTypes.ENUM('BBQ', 'Pizza', 'Dish', 'Salad', 'Dessert', 'Drink'),
      allowNull: false,
    },
    PortionSize: {
      type: DataTypes.INTEGER,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
