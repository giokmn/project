'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ContactUsRecords', [
      {
        CustomerId: 1,       // Pretpostavljamo da korisnik sa ID 1 postoji u tabeli Customers
        Message: 'I have a question about my membership.',
        DateSent: new Date(),
        Status: 'Pending',
        Response: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CustomerId: 2,       // Pretpostavljamo da korisnik sa ID 2 postoji u tabeli Customers
        Message: 'I need help with billing issues.',
        DateSent: new Date(),
        Status: 'Resolved',
        Response: 'Your billing issue has been resolved. Please check your account.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CustomerId: 3,       // Pretpostavljamo da korisnik sa ID 3 postoji u tabeli Customers
        Message: 'Is there any discount on gym memberships?',
        DateSent: new Date(),
        Status: 'Pending',
        Response: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ContactUsRecords', null, {});
  }
};