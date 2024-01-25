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
      // quan he 1-1
      User.hasOne(models.Phone, {
        foreignKey: "user_id",
        as: "phone",
      });
      // quan he 1-N
      User.hasMany(models.Post, {
        foreignKey: "user_id",
        as: "posts",
      });
      // quan he N-N
      User.belongsToMany(models.Course, {
        foreignKey: "user_id",
        through: "users_courses",
        as: "courses",
      });
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
      deletedAt: "deleted_at",
      // paranoid: true, // Kich hoat xoa mem (timestamps: true)
    }
  );
  return User;
};
