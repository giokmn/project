'use strict'; // Enforces stricter parsing and error handling in JavaScript

const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

module.exports = {
  // 'up' function handles the creation/insertion of data during migration
  up: async (queryInterface, Sequelize) => {
    // Hash passwords with bcrypt using 10 salt rounds for security
    const hashedPassword1 = await bcrypt.hash('champion123', 10);
    const hashedPassword2 = await bcrypt.hash('knockout456', 10);
    const hashedPassword3 = await bcrypt.hash('tapout789', 10);

    // Bulk insert customer data into the 'Customers' table
    return queryInterface.bulkInsert('Customers', [
      {
        FirstName: 'Conor',         // Customer's first name
        LastName: 'McGregor',      // Customer's last name
        UserName: 'thenotorious',  // Unique username for login
        Password: hashedPassword1, // Hashed password for security
        Phone: '123456789',        // Contact phone number (simplified for example)
        DeliveryAddress: '12 Crumlin Rd, Dublin', // Delivery location
        createdAt: new Date(),     // Timestamp of record creation
        updatedAt: new Date(),     // Timestamp of last update
      },
      {
        FirstName: 'Khabib',       // Customer's first name
        LastName: 'Nurmagomedov',  // Customer's last name
        UserName: 'eagle',         // Unique username for login
        Password: hashedPassword2, // Hashed password for security
        Phone: '987654321',        // Contact phone number (simplified for example)
        DeliveryAddress: 'Dagestan, Russia', // Delivery location
        createdAt: new Date(),     // Timestamp of record creation
        updatedAt: new Date(),     // Timestamp of last update
      },
      {
        FirstName: 'Anderson',     // Customer's first name
        LastName: 'Silva',         // Customer's last name
        UserName: 'spider',        // Unique username for login
        Password: hashedPassword3, // Hashed password for security
        Phone: '111222333',        // Contact phone number (simplified for example)
        DeliveryAddress: 'Curitiba, Brazil', // Delivery location
        createdAt: new Date(),     // Timestamp of record creation
        updatedAt: new Date(),     // Timestamp of last update
      }
    ]);
  },

  // 'down' function handles the rollback/deletion of data during migration
  down: async (queryInterface, Sequelize) => {
    // Delete all records from 'Customers' table to undo the migration
    return queryInterface.bulkDelete('Customers', null, {});
  }
};