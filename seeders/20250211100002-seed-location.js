'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Locations', [
      {
        Name: 'Main Restaurant Location',
        Phone: '+1234567890',
        createdAt: new Date(),
        updatedAt: new Date(), 
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Locations', null, {});
  }
};