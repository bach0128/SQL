const sql = require("../utils/db");

module.exports = {
  all: (status, keyword) => {
    let filter = sql`WHERE name IS NOT NULL`;

    if (status === "active" || status === "inactive" || status === "all") {
      filter = sql`${filter} AND status=${status === "active"}`;
    }
    if (keyword) {
      filter = sql`${filter} AND LOWER(email) LIKE ${
        "%" + keyword.toLowerCase() + "%"
      }`;
    }
    return sql`SELECT * FROM users ${filter}`;
  },
  checkEmail: (emailInput) => {
    return sql`SELECT * FROM users WHERE email=${emailInput}`;
  },
  add: ({ name, email, status }) => {
    return sql`INSERT INTO users(name, email, status, created_at, updated_at) VALUES(${name}, ${email}, ${status}, NOW(), NOW())`;
  },
  delete: (id) => {
    return sql`DELETE FROM users WHERE id=${id}`;
  },
  getUser: (id) => {
    return sql`SELECT * FROM users WHERE id=${id}`;
  },
  edit: ({ id, name, email, status }) => {
    console.log(id, name, email, status);
    // return sql`UPDATE users SET name = ${name}, email = ${email}, status = ${status} WHERE id=${id}`;
  },
};
