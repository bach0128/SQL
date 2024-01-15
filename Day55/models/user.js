"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      // khai bao column trong table
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      // options
      sequelize,
      modelName: "User",
      tableName: "users", // ten table trong database
      // mặc định sequelize từj động khai báo created_at và updated_at
      //  Nếu muốn vô hiệu hóa khai báo timestamps: false
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
