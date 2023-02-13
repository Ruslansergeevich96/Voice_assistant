const { Pool } = require("pg");
const pool = require("../db");

const createUsersTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `;

  await pool.query(queryText);
};

module.exports = {
  createUsersTable,
};
