'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      // Association with OrderItem table
      Product.hasMany(models.OrderItem, { foreignKey: 'ProductId', onDelete: 'CASCADE' });
      Product.hasOne(models.DailyMenu, { foreignKey: 'ProductId' });
    }
  }

  Product.init(
    {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MenuType: {
        type: DataTypes.ENUM('BBQ', 'Pizza', 'Dish', 'Salad', 'Dessert', 'Drink'),
        allowNull: false,
      },
      PortionSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
    }
  );

  return Product;
};