import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import createProductsTable from "./data/productTable.js";
import createUsersTable from "./data/userTable.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Create tables
createUsersTable();
createProductsTable();

// Test DB connection
app.get("/test-db-connection", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send("The database name is: " + result.rows[0].current_database);
  } catch (error) {
    next(error);
  }
});

// Run app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});