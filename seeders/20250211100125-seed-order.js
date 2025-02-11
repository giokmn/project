'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [
      {
        CustomerId: 1,  // Pretpostavljamo da korisnik sa ID 1 postoji u tabeli Customers
        PaymentId: 1,    // Pretpostavljamo da opcija plaćanja sa ID 1 postoji u tabeli Payments
        TotalPrice: 45.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        CustomerId: 2,  // Pretpostavljamo da korisnik sa ID 2 postoji u tabeli Customers
        PaymentId: 2,    // Pretpostavljamo da opcija plaćanja sa ID 2 postoji u tabeli Payments
        TotalPrice: 79.49,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};