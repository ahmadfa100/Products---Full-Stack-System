import pool from "../config/db.js";

const createProductsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(1000) NOT NULL,
      image_url TEXT,
      price DECIMAL(18, 2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await pool.query(queryText);
    console.log("Products table created successfully");
  } catch (error) {
    console.error("Error creating products table:", error);
  }
};

export default createProductsTable;