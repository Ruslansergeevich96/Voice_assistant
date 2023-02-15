const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../models/models");
const { pool } = require("../db");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User(null, name, email, hashedPassword);

  const queryText = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [user.name, user.email, user.password];

  try {
    const { rows } = await pool.query(queryText, values);
    const newUser = rows[0];
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  createUser,
};
