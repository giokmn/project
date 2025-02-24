'use strict'; // Enables strict mode to enforce safer coding practices and catch errors

module.exports = {
  up: async (queryInterface, Sequelize) => {
      // 'up' function executes when applying the migration to insert data
    await queryInterface.bulkInsert('Orders', [
      {
        CustomerId: 1,  // Assuming a user with ID 1 exists in the 'Customers' table
        PaymentId: 1,    // Assuming a payment option with ID 1 exists in the 'Payments' table
        TotalPrice: 45.99,  // Total price for the order
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        CustomerId: 2,  // Assuming a user with ID 2 exists in the 'Customers' table
        PaymentId: 2,    // Assuming a payment option with ID 2 exists in the 'Payments' table
        TotalPrice: 79.49,  // Total price for the order
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Deleting all data from the 'Orders' table (rollback the above insertion)
    await queryInterface.bulkDelete('Orders', null, {});
  }
};