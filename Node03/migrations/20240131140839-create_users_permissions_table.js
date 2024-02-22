"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users_permissions", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        allowNull: false,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        type: Sequelize.STRING,
      },
      permission_id: {
        allowNull: false,
        references: {
          model: {
            tableName: "permissions",
          },
          key: "id",
        },
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users_permissions");
  },
};
