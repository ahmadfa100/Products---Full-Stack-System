import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import createProductsTable from "./data/productTable.js";
import createUsersTable from "./data/userTable.js";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Create tables
createUsersTable();
createProductsTable();

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes);

// Test DB connection
app.get("/test-db-connection", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send("The database name is: " + result.rows[0].current_database);
  } catch (error) {
    next(error);
  }
});

// Error Middleware
app.use(errorMiddleware);

// Run app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});