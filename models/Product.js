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
      ProductId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
      modelName: 'Product',
      timestamps: true, // createdAt and updatedAt
    }
  );

  return Product;
};