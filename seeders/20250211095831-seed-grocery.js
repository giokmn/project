'use strict'; // Enables strict mode to enforce safer coding practices and catch errors

module.exports = {
  // 'up' function executes when applying the migration to insert data
  up: async (queryInterface, Sequelize) => {
    // Bulk insert grocery items into the 'Groceries' table
    await queryInterface.bulkInsert('Groceries', [
      {
        Name: 'Chicken Breast',   // Name of the grocery item
        Stock: 100,              // Quantity available in stock
        Price: 5.99,             // Price per unit in dollars
        createdAt: new Date(),   // Timestamp when the record is created
        updatedAt: new Date(),   // Timestamp when the record is last updated
      },
      {
        Name: 'Ground Beef',     // Name of the grocery item
        Stock: 50,               // Quantity available in stock
        Price: 7.49,             // Price per unit in dollars
        createdAt: new Date(),   // Timestamp when the record is created
        updatedAt: new Date(),   // Timestamp when the record is last updated
      },
      {
        Name: 'Carrots',         // Name of the grocery item
        Stock: 200,              // Quantity available in stock
        Price: 1.49,             // Price per unit in dollars
        createdAt: new Date(),   // Timestamp when the record is created
        updatedAt: new Date(),   // Timestamp when the record is last updated
      },
      {
        Name: 'Potatoes',        // Name of the grocery item
        Stock: 300,              // Quantity available in stock
        Price: 2.99,             // Price per unit in dollars
        createdAt: new Date(),   // Timestamp when the record is created
        updatedAt: new Date(),   // Timestamp when the record is last updated
      },
      {
        Name: 'Apples',          // Name of the grocery item
        Stock: 150,              // Quantity available in stock
        Price: 3.99,             // Price per unit in dollars
        createdAt: new Date(),   // Timestamp when the record is created
        updatedAt: new Date(),   // Timestamp when the record is last updated
      },
      {
        Name: 'Bananas',         // Name of the grocery item
        Stock: 200,              // Quantity available in stock
        Price: 1.29,             // Price per unit in dollars
        createdAt: new Date(),   // Timestamp when the record is created
        updatedAt: new Date(),   // Timestamp when the record is last updated
      },
      {
        Name: 'Spinach',         // Name of the grocery item
        Stock: 80,               // Quantity available in stock
        Price: 2.49,             // Price per unit in dollars
        createdAt: new Date(),   // Timestamp when the record is created
        updatedAt: new Date(),   // Timestamp when the record is last updated
      },
      {
        Name: 'Tomatoes',        // Name of the grocery item
        Stock: 120,              // Quantity available in stock
        Price: 3.29,             // Price per unit in dollars
        createdAt: new Date(),   // Timestamp when the record is created
        updatedAt: new Date(),   // Timestamp when the record is last updated
      },
    ], {}); // Empty options object for bulkInsert
  },

  // 'down' function executes when rolling back the migration
  down: async (queryInterface, Sequelize) => {
    // Delete all records from the 'Groceries' table to undo the migration
    await queryInterface.bulkDelete('Groceries', null, {});
  }
};