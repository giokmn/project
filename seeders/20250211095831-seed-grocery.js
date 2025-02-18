'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Groceries', [
      {
        Name: 'Chicken Breast',
        Stock: 100,
        Price: 5.99,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        Name: 'Ground Beef',
        Stock: 50,
        Price: 7.49,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        Name: 'Carrots',
        Stock: 200,
        Price: 1.49,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        Name: 'Potatoes',
        Stock: 300,
        Price: 2.99,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        Name: 'Apples',
        Stock: 150,
        Price: 3.99,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        Name: 'Bananas',
        Stock: 200,
        Price: 1.29,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        Name: 'Spinach',
        Stock: 80,
        Price: 2.49,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        Name: 'Tomatoes',
        Stock: 120,
        Price: 3.29,
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Groceries', null, {});
  }
};