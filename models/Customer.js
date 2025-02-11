'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hash

module.exports = (sequelize) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Order, { foreignKey: 'CustomerId', onDelete: 'CASCADE' });
      Customer.hasMany(models.ContactUsRecord, { foreignKey: 'CustomerId' });
    }
  }

  Customer.init(
    {
      CustomerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DeliveryAddress: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
      timestamps: true, // Adds createdAt and updatedAt columns
      hooks: {
        // Hook for hashing password before saving the customer instance
        beforeCreate: async (customer) => {
          if (customer.Password) {
            customer.Password = await bcrypt.hash(customer.Password, 10);
          }
        },
        beforeUpdate: async (customer) => {
          if (customer.Password) {
            customer.Password = await bcrypt.hash(customer.Password, 10);
          }
        },
      },
    }
  );

  return Customer;
};