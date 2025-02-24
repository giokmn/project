'use strict';  
// Strict mode for safer JS.

const { Model, DataTypes } = require('sequelize');  
// Imports Sequelize Model and DataTypes.

module.exports = (sequelize) => {  
  // Exports function to define DailyMenu model.
  class DailyMenu extends Model {  
    static associate(models) {  
      // Defines model associations.
      DailyMenu.belongsTo(models.Product, { foreignKey: 'ProductId' }); // N:1 with Product.
    }
  }

  DailyMenu.init(
    {
      ProductId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'Product', key: 'ProductId' } 
      }, // Required FK to Product.
      Discount: { type: DataTypes.DECIMAL(5, 2), allowNull: false }, // Required discount with 2 decimals.
    },
    {
      sequelize, // Sequelize instance.
    }
  );

  return DailyMenu; // Returns DailyMenu model.
};