'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Customer, { foreignKey: 'CustomerId' });
      Order.belongsTo(models.Payment, { foreignKey: 'PaymentId' });
      Order.hasMany(models.OrderItem, { foreignKey: 'OrderId', onDelete: 'CASCADE' });
    }
  }

  Order.init(
    {
      OrderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Customer',
          key: 'CustomerId',
        },
      },
      PaymentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Payment',
          key: 'PaymentId',
        },
      },
      TotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      timestamps: true, // createdAt i updatedAt
    }
  );

  return Order;
};