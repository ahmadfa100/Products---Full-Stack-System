import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js";
import { decrypt } from "dotenv";
import createProductsTable from "./data/productTable.js";
import createUsersTable from "./data/userTable.js";
dotenv.config();

const app = express()
const PORT = process.env.PORT||3001

//middleware
app.use(express.json())
app.use(cors())

//route

//handle error

//test db
createUsersTable()
createProductsTable()
app.get("/test-db-connection", async(req , res)=>{
    const result = await pool.query("SELECT current_database()")
    res.send("the database name is: " + result.rows[0].current_database)
})

//run app
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})