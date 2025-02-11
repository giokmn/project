'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CashRegisters', [
      {
        DailyCash: 10000.00,   // Start amount in register
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DailyCash: 250.50,   // New amount
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DailyCash: 50.75,   
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CashRegisters', null, {});
  }
};