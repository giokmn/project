'use strict';  
// Strict mode for safer JS.

const { Model, DataTypes } = require('sequelize');  
// Imports Sequelize Model and DataTypes.
const bcrypt = require('bcrypt');  
// Imports bcryptjs for password hashing.

module.exports = (sequelize) => {  
  // Exports function to define Customer model.
  class Customer extends Model {  
    static associate(models) {  
      // Defines model associations.
      Customer.hasMany(models.Order, { foreignKey: 'CustomerId', onDelete: 'CASCADE' }); // 1:N with Order.
      Customer.hasMany(models.ContactUsRecord, { foreignKey: 'CustomerId' }); // 1:N with ContactUsRecord.
    }
  }

  Customer.init(
    {
      FirstName: { type: DataTypes.STRING, allowNull: false }, // Required first name.
      LastName: { type: DataTypes.STRING, allowNull: false }, // Required last name.
      UserName: { type: DataTypes.STRING, allowNull: false }, // Required username.
      Password: { type: DataTypes.STRING, allowNull: false }, // Required password (hashed).
      Phone: { type: DataTypes.STRING, allowNull: false }, // Required phone.
      DeliveryAddress: { type: DataTypes.STRING }, // Optional delivery address.
    },
    {
      sequelize, // Sequelize instance.
      hooks: {  
        beforeCreate: async (customer) => {  
          // Hashes password before creating customer.
          if (customer.Password) {
            const salt = await bcrypt.genSalt(10);
            customer.Password = await bcrypt.hash(customer.Password, salt);
          }
        },
        beforeUpdate: async (customer) => {  
          // Hashes password before update if changed.
          if (customer.changed('Password')) {
            const salt = await bcrypt.genSalt(10);
            customer.Password = await bcrypt.hash(customer.Password, salt);
          }
        },
      },
    }
  );

  return Customer; // Returns Customer model.
};