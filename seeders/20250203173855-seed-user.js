'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        UserName: 'boss',
        HashedPassword: await bcrypt.hash('owner123', 10),  // hashed password
        FirstName: 'Joe',
        LastName: 'Rogan',
        DateBirth: '1967-08-11',
        Email: 'joerogan@example.com',
        Phone: '123-456-7890',
        Role: 'Owner',
        HireDate: '2025-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserName: 'admin',
        HashedPassword: await bcrypt.hash('ownerboy123', 10), // hashed password
        FirstName: 'Ilia',
        LastName: 'Topurria',
        DateBirth: '1997-01-21',
        Email: 'elmatador@example.com',
        Phone: '555-333-4194',
        Role: 'Manager',
        HireDate: '2025-01-10',
        createdAt: new Date(),
        updatedAt: new Date(), 
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};