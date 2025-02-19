'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('champion123', 10);
    const hashedPassword2 = await bcrypt.hash('knockout456', 10);
    const hashedPassword3 = await bcrypt.hash('tapout789', 10);

    return queryInterface.bulkInsert('Customers', [
      {
        FirstName: 'Conor',
        LastName: 'McGregor',
        UserName: 'thenotorious',
        Password: hashedPassword1,
        Phone: '123456789',
        DeliveryAddress: '12 Crumlin Rd, Dublin',
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        FirstName: 'Khabib',
        LastName: 'Nurmagomedov',
        UserName: 'eagle',
        Password: hashedPassword2,
        Phone: '987654321',
        DeliveryAddress: 'Dagestan, Russia',
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        FirstName: 'Anderson',
        LastName: 'Silva',
        UserName: 'spider',
        Password: hashedPassword3,
        Phone: '111222333',
        DeliveryAddress: 'Curitiba, Brazil',
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};