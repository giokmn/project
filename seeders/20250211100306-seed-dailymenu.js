'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting sample data into the 'DailyMenus' table
    await queryInterface.bulkInsert('DailyMenus', [
      {
        ProductId: 1,    // Assuming a product with ID 1 exists in the 'Products' table
        Discount: 10.00,  // 10% discount for this product
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        ProductId: 2,    // Assuming a product with ID 2 exists in the 'Products' table
        Discount: 15.50,  // 15.5% discount for this product
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        ProductId: 3,    // Assuming a product with ID 3 exists in the 'Products' table
        Discount: 5.00,   // 5% discount for this product
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Deleting all data from the 'DailyMenus' table (rollback the above insertion)
    await queryInterface.bulkDelete('DailyMenus', null, {});
  }
};