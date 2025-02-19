'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting sample data into the 'ContactUsRecords' table
    await queryInterface.bulkInsert('ContactUsRecords', [
      {
        CustomerId: 1,       // Assuming a customer with ID 1 exists in the 'Customers' table
        Message: 'I have a question about my order.',
        DateSent: new Date(), // Date the message was sent
        Status: 'Pending',    // Status of the inquiry ('Pending', 'Resolved', etc.)
        Response: null,       // No response yet
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        CustomerId: 2,       // Assuming a customer with ID 2 exists in the 'Customers' table
        Message: 'I need help with billing issues.',
        DateSent: new Date(), // Date the message was sent
        Status: 'Resolved',   // Status of the inquiry
        Response: 'Your billing issue has been resolved. Please check your account.',
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        CustomerId: 3,       // Assuming a customer with ID 3 exists in the 'Customers' table
        Message: 'Is there any discount on menu?',
        DateSent: new Date(), // Date the message was sent
        Status: 'Pending',    // Status of the inquiry
        Response: null,       // No response yet
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Deleting all data from the 'ContactUsRecords' table (rollback the above insertion)
    await queryInterface.bulkDelete('ContactUsRecords', null, {});
  }
};