'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports= (sequelize) =>{
class Payment extends Model{
  static associate(models){
    Payment.hasMany(models.Order, { foreignKey: 'PaymentId' });
  }
}

Payment.init(
  {
    PaymentId:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    Name:{
      type:DataTypes.STRING,
    }
  },
  {
    sequelize,  // Make sure to pass the sequelize instance here
    modelName: 'Payment',
    timestamps: true,
  }
)
return Payment
}