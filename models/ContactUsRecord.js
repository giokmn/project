'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ContactUsRecord extends Model {
    static associate(models) {
      ContactUsRecord.belongsTo(models.Customer, { foreignKey: 'CustomerId' });
    }
  }

  ContactUsRecord.init(
    {
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Customer', 
          key: 'CustomerId',
        },
      },
      Message: {
        type: DataTypes.TEXT, 
        allowNull: false,
      },
      DateSent: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending', 
      },
      Response: {
        type: DataTypes.TEXT, 
        allowNull: true, 
      },
    },
    {
      sequelize,
    }
  );

  return ContactUsRecord;
};