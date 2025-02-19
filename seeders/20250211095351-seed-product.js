'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        Name: 'BBQ Ribs',
        MenuType: 'BBQ',
        PortionSize: 500,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        Name: 'Pepperoni Pizza',
        MenuType: 'Pizza',
        PortionSize: 350,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        Name: 'Caesar Salad',
        MenuType: 'Salad',
        PortionSize: 300,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        Name: 'Chocolate Cake',
        MenuType: 'Dessert',
        PortionSize: 200,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        Name: 'Coca-Cola',
        MenuType: 'Drink',
        PortionSize: 500,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};