import pool from "../config/db.js";

const createUsersTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await pool.query(queryText);
    console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

export default createUsersTable;