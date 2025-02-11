'use strict';

const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('securepass456', 10);

    return queryInterface.bulkInsert('Customers', [
      {
        FirstName: 'John',
        LastName: 'Doe',
        UserName: 'johndoe',
        Password: hashedPassword1,
        Phone: '123456789',
        DeliveryAddress: '123 Main St, City',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FirstName: 'Jane',
        LastName: 'Smith',
        UserName: 'janesmith',
        Password: hashedPassword2,
        Phone: '987654321',
        DeliveryAddress: '456 Oak St, Town',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};