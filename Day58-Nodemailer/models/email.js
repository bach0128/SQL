"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Email.init(
    {
      // khai bao column trong table
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      to: DataTypes.STRING,
      subject: DataTypes.STRING,
      content: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Email",
      tableName: "emails", // ten table trong database
      // mặc định sequelize từj động khai báo created_at và updated_at
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Email;
};
