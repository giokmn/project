'use strict';

const bcrypt = require('bcrypt');

/** 
 * @type {import('sequelize-cli').Migration}
 * Seeder for inserting initial user data into the 'Users' table.
 */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Generate hashed passwords for the users
    const password1 = await bcrypt.hash('owner123', 10);  // Hash the password for 'boss'
    const password2 = await bcrypt.hash('ownerboy123', 10);  // Hash the password for 'admin'

    // Insert initial user data into the 'Users' table
    await queryInterface.bulkInsert('Users', [
      {
        UserName: 'boss',
        Password: password1,  // Hashed password for 'boss'
        FirstName: 'Joe',
        LastName: 'Rogan',
        DateBirth: '1967-08-11',
        Email: 'joerogan@example.com',
        Phone: '123-456-7890',
        Role: 'Owner',  // Role set to 'Owner'
        HireDate: '2025-01-01',
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      },
      {
        UserName: 'admin',
        Password: password2,  // Hashed password for 'admin'
        FirstName: 'Ilia',
        LastName: 'Topurria',
        DateBirth: '1997-01-21',
        Email: 'elmatador@example.com',
        Phone: '555-333-4194',
        Role: 'Manager',  // Role set to 'Manager'
        HireDate: '2025-01-10',
        createdAt: new Date(),  // Add createdAt
        updatedAt: new Date(),  // Add updatedAt
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    // Delete all users from the 'Users' table when rolling back the migration
    await queryInterface.bulkDelete('Users', null, {});
  }
};