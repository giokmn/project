'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Locations', [
      {
        Name: 'Main Restaurant Location',
        Phone: '+1234567890',
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Locations', null, {});
  }
};