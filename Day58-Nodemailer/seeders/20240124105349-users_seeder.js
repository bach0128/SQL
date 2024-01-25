"use strict";

/** @type {import('sequelize-cli').Migration} */
const { faker } = require("@faker-js/faker");
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 50; i++) {
      users.push({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        status: faker.datatype.boolean(),
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
        address: faker.location.streetAddress(),
      });
    }
    await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users");
  },
};
