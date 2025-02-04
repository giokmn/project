'use strict'
const {Model, DataTypes, Sequelize}=require('sequelize')
const { noTrueLogging } = require('sequelize/lib/utils/deprecations')

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
  }
)
}