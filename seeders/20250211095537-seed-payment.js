'use strict'; // Enforces strict mode to catch common coding errors and improve security

/** @type {import('sequelize-cli').Migration} */
// Type annotation indicating this is a Sequelize CLI migration file

module.exports = {
  // 'up' function runs when applying the migration to add data
  async up(queryInterface, Sequelize) {
    // Insert payment method records into the 'Payments' table
    await queryInterface.bulkInsert('Payments', [
      {
        Name: 'Credit Card',      // Payment method name
        createdAt: new Date(),    // Timestamp of record creation
        updatedAt: new Date(),    // Timestamp of last record update
      },
      {
        Name: 'Debit Card',       // Payment method name
        createdAt: new Date(),    // Timestamp of record creation
        updatedAt: new Date(),    // Timestamp of last record update
      },
      {
        Name: 'PayPal',          // Payment method name
        createdAt: new Date(),    // Timestamp of record creation
        updatedAt: new Date(),    // Timestamp of last record update
      },
      {
        Name: 'Bank Transfer',    // Payment method name
        createdAt: new Date(),    // Timestamp of record creation
        updatedAt: new Date(),    // Timestamp of last record update
      },
      {
        Name: 'Cash',            // Payment method name
        createdAt: new Date(),    // Timestamp of record creation
        updatedAt: new Date(),    // Timestamp of last record update
      },
    ], {}); // Empty options object for bulkInsert
  },

  // 'down' function runs when reverting the migration to remove data
  async down(queryInterface, Sequelize) {
    // Delete all records from the 'Payments' table to undo the migration
    await queryInterface.bulkDelete('Payments', null, {});
  }
};