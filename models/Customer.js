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
      hooks: {
        // Hook for hashing password before saving the customer instance
        beforeCreate: async (customer) => {
          if (customer.Password) {
            const salt = await bcrypt.genSalt(10);
            customer.Password = await bcrypt.hash(customer.Password, salt);
          }
        },
        beforeUpdate: async (customer) => {
          if (customer.changed('Password')) {
            const salt = await bcrypt.genSalt(10);
            customer.Password = await bcrypt.hash(customer.Password, salt);
          }
        },
      },
    }
  );

  return Customer;
};