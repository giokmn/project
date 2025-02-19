'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting sample data into the 'OrderItems' table
    await queryInterface.bulkInsert('OrderItems', [
      {
        OrderId: 1,      // Assuming an order with ID 1 exists in the 'Orders' table
        ProductId: 1,    // Assuming a product with ID 1 exists in the 'Products' table
        Quantity: 2,     // Quantity of the product ordered
        Price: 5.99,     // Price per product
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        OrderId: 1,      // Assuming an order with ID 1 exists in the 'Orders' table
        ProductId: 2,    // Assuming a product with ID 2 exists in the 'Products' table
        Quantity: 1,     // Quantity of the product ordered
        Price: 7.49,     // Price per product
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        OrderId: 2,      // Assuming an order with ID 2 exists in the 'Orders' table
        ProductId: 3,    // Assuming a product with ID 3 exists in the 'Products' table
        Quantity: 3,     // Quantity of the product ordered
        Price: 1.29,     // Price per product
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Deleting all data from the 'OrderItems' table (rollback the above insertion)
    await queryInterface.bulkDelete('OrderItems', null, {});
  }
};