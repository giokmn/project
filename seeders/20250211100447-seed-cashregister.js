'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CashRegisters', [
      {
        DailyCash: 10000.00,   // Start amount in register\
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        DailyCash: 250.50,   // New amount
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        DailyCash: 50.75,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CashRegisters', null, {});
  }
};