"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.User, {
        foreignKey: "course_id",
        through: "users_courses",
        as: "users",
      });
    }
  }
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "courses",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Course;
};
