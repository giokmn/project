'use strict'; // Enables strict mode for better error handling and safer coding practices

module.exports = {
  // 'up' function executes when applying the migration
  up: async (queryInterface, Sequelize) => {
    // Bulk insert product data into the 'Products' table
    return queryInterface.bulkInsert('Products', [
      {
        Name: 'BBQ Ribs',          // Product name
        MenuType: 'BBQ',          // Category of the menu item
        PortionSize: 500,         // Portion size in grams or milliliters
        createdAt: new Date(),    // Timestamp when the record is created
        updatedAt: new Date(),    // Timestamp when the record is last updated
      },
      {
        Name: 'Pepperoni Pizza',  // Product name
        MenuType: 'Pizza',        // Category of the menu item
        PortionSize: 350,         // Portion size in grams
        createdAt: new Date(),    // Timestamp when the record is created
        updatedAt: new Date(),    // Timestamp when the record is last updated
      },
      {
        Name: 'Caesar Salad',     // Product name
        MenuType: 'Salad',        // Category of the menu item
        PortionSize: 300,         // Portion size in grams
        createdAt: new Date(),    // Timestamp when the record is created
        updatedAt: new Date(),    // Timestamp when the record is last updated
      },
      {
        Name: 'Chocolate Cake',   // Product name
        MenuType: 'Dessert',      // Category of the menu item
        PortionSize: 200,         // Portion size in grams
        createdAt: new Date(),    // Timestamp when the record is created
        updatedAt: new Date(),    // Timestamp when the record is last updated
      },
      {
        Name: 'Coca-Cola',        // Product name
        MenuType: 'Drink',        // Category of the menu item
        PortionSize: 500,         // Portion size in milliliters
        createdAt: new Date(),    // Timestamp when the record is created
        updatedAt: new Date(),    // Timestamp when the record is last updated
      }
    ]);
  },

  // 'down' function executes when rolling back the migration
  down: async (queryInterface, Sequelize) => {
    // Remove all records from the 'Products' table to undo the migration
    return queryInterface.bulkDelete('Products', null, {});
  }
};