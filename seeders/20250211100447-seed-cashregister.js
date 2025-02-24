'use strict'; // Enforces strict mode to enhance code safety and catch errors

module.exports = {
  // 'up' function runs when applying the migration to insert data
  up: async (queryInterface, Sequelize) => {
    // Bulk insert cash register records into the 'CashRegisters' table
    await queryInterface.bulkInsert('CashRegisters', [
      {
        DailyCash: 10000.00,    // Initial cash amount in the register (in dollars)
        createdAt: new Date(),  // Timestamp when the record is created
        updatedAt: new Date(),  // Timestamp when the record is last updated
      },
      {
        DailyCash: 250.50,      // Current cash amount in the register (in dollars)
        createdAt: new Date(),  // Timestamp when the record is created
        updatedAt: new Date(),  // Timestamp when the record is last updated
      },
      {
        DailyCash: 50.75,       // Current cash amount in the register (in dollars)
        createdAt: new Date(),  // Timestamp when the record is created
        updatedAt: new Date(),  // Timestamp when the record is last updated
      },
    ], {}); // Empty options object for bulkInsert
  },

  // 'down' function runs when reverting the migration to remove data
  down: async (queryInterface, Sequelize) => {
    // Delete all records from the 'CashRegisters' table to undo the migration
    await queryInterface.bulkDelete('CashRegisters', null, {});
  }
};