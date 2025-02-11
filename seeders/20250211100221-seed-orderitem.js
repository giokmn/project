'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderItems', [
      {
        OrderId: 1,      // Pretpostavljamo da narudžbina sa ID 1 postoji u tabeli Orders
        ProductId: 1,    // Pretpostavljamo da proizvod sa ID 1 postoji u tabeli Products
        Quantity: 2,
        Price: 5.99,     // Cena za jedan proizvod
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        OrderId: 1,      // Pretpostavljamo da narudžbina sa ID 1 postoji u tabeli Orders
        ProductId: 2,    // Pretpostavljamo da proizvod sa ID 2 postoji u tabeli Products
        Quantity: 1,
        Price: 7.49,     // Cena za jedan proizvod
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        OrderId: 2,      // Pretpostavljamo da narudžbina sa ID 2 postoji u tabeli Orders
        ProductId: 3,    // Pretpostavljamo da proizvod sa ID 3 postoji u tabeli Products
        Quantity: 3,
        Price: 1.29,     // Cena za jedan proizvod
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderItems', null, {});
  }
};