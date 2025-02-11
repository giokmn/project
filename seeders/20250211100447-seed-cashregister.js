'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CashRegisters', [
      {
        DailyCash: 100.00,   // Početni iznos u registru
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DailyCash: 250.50,   // Početni iznos u registru
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DailyCash: 50.75,    // Početni iznos u registru
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CashRegisters', null, {});
  }
};