'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContactUsRecords', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      CustomerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'CustomerId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      DateSent: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending',
      },
      Response: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ContactUsRecords');
  },
};
