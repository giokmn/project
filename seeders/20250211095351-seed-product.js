'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        Name: 'BBQ Ribs',
        MenuType: 'BBQ',
        PortionSize: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Name: 'Pepperoni Pizza',
        MenuType: 'Pizza',
        PortionSize: 350,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Name: 'Caesar Salad',
        MenuType: 'Salad',
        PortionSize: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Name: 'Chocolate Cake',
        MenuType: 'Dessert',
        PortionSize: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Name: 'Coca-Cola',
        MenuType: 'Drink',
        PortionSize: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};