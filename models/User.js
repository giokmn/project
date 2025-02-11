"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
    }

    // Method for checking password when loging in
    async checkPassword(password) {
      return await bcrypt.compare(password, this.Password);
    }
  }

  User.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DateBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notNull: {
            msg: "Email is required.",
          },
        },
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Role: {
        type: DataTypes.ENUM("Manager", "Owner", "Chef"),
        allowNull: false,
      },
      HireDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true, // Adds createdAt and updatedAt columns
      hooks: {
        //Hook for hashing password before entry in database
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.Password = await bcrypt.hash(user.Password, salt);
        },
        beforeUpdate: async (user) => {
          if (user.changed("Password")) {
            const salt = await bcrypt.genSalt(10);
            user.Password = await bcrypt.hash(user.Password, salt);
          }
        },
      },
    }
  );

  return User;
};