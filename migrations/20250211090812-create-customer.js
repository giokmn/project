'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');  // Import DataTypes

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      CustomerId: {  // Primary key
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DeliveryAddress: {
        type: DataTypes.STRING,
      },
      // Timestamp fields
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  }
};