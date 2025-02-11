'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DailyMenus', [
      {
        ProductId: 1,    // Pretpostavljamo da proizvod sa ID 1 postoji u tabeli Products
        Discount: 10.00,  // Popust od 10%
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ProductId: 2,    // Pretpostavljamo da proizvod sa ID 2 postoji u tabeli Products
        Discount: 15.50,  // Popust od 15.50%
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ProductId: 3,    // Pretpostavljamo da proizvod sa ID 3 postoji u tabeli Products
        Discount: 5.00,   // Popust od 5%
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DailyMenus', null, {});
  }
};