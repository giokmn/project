'use strict';  
// Strict mode for safer JS.

const { DataTypes } = require('sequelize');  
// Imports Sequelize DataTypes.

module.exports = {
  async up (queryInterface, Sequelize) {
    // Creates 'Users' table.
    await queryInterface.createTable('Users', {
      UserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Auto-incrementing PK.
      UserName: { type: DataTypes.STRING, allowNull: false }, // Required username.
      Password: { type: DataTypes.STRING, allowNull: false }, // Required password.
      FirstName: { type: DataTypes.STRING, allowNull: false }, // Required first name.
      LastName: { type: DataTypes.STRING, allowNull: false }, // Required last name.
      DateBirth: { type: DataTypes.DATE, allowNull: false }, // Required birth date.
      Email: { type: DataTypes.STRING, allowNull: false, unique: true }, // Required unique email.
      Phone: { type: DataTypes.STRING, allowNull: false }, // Required phone.
      Role: { type: DataTypes.ENUM('Manager', 'Owner', 'Chef'), allowNull: false }, // Required role enum.
      HireDate: { type: DataTypes.DATE, allowNull: false }, // Required hire date.
      createdAt: { type: DataTypes.DATE, allowNull: false }, // Timestamp for creation.
      updatedAt: { type: DataTypes.DATE, allowNull: false }, // Timestamp for updates.
    });
  },

  async down (queryInterface, Sequelize) {
    // Drops 'Users' table.
    await queryInterface.dropTable('Users');
  }
};