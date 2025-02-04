'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DailyMenu extends Model {
    static associate(models) {
      DailyMenu.belongsTo(models.Product, { foreignKey: 'ProductId' });
    }
  }

  DailyMenu.init(
    {
      DailyMenuId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'ProductId',
        },
      },
      Discount: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'DailyMenu',
      timestamps: true,
    }
  );

  return DailyMenu;
};