'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Payments', [
      {
        Name: 'Credit Card',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: 'Debit Card',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: 'PayPal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: 'Bank Transfer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: 'Cash',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', null, {});
  }
};