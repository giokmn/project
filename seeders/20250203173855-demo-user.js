'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        UserName: 'admin',
        Password: 'password123',
        FirstName: 'John',
        LastName: 'Doe',
        DateBirth: '1990-01-01',
        Email: 'john.doe@example.com',
        Phone: '123-456-7890',
        Role: 'Manager',
        HireDate: '2025-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
