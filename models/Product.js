'use strict';  
// Strict mode for safer JS.

const { Model, DataTypes } = require('sequelize');  
// Imports Sequelize Model and DataTypes.

module.exports = (sequelize) => {
  // Exports function to define Product model.
  class Product extends Model {
    static associate(models) {  
      // Defines model associations.
      Product.hasMany(models.OrderItem, { foreignKey: 'ProductId', onDelete: 'CASCADE' }); // 1:N with OrderItem.
      Product.hasOne(models.DailyMenu, { foreignKey: 'ProductId' }); // 1:1 with DailyMenu.
    }
  }

  Product.init(
    {
      Name: { type: DataTypes.STRING, allowNull: false }, // Required product name.
      MenuType: { type: DataTypes.ENUM('BBQ', 'Pizza', 'Dish', 'Salad', 'Dessert', 'Drink'), allowNull: false }, // Required menu type enum.
      PortionSize: { type: DataTypes.INTEGER, allowNull: false }, // Required portion size.
    },
    {
      sequelize, // Sequelize instance.
    }
  );

  return Product; // Returns Product model.
};