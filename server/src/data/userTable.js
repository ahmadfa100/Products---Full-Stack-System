import pool from "../config/db.js";

const createUsersTable= async()=>{
    const queryText = `
    CREATE TABLE IF NOT EXISTS users(
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    confirmPassword varchar(255) not null,
    created_at TIMESTAMP DEFAULT current_timestamp
    )
    `
    try{
    await pool.query(queryText);
    console.log("Users table created successfully");

}
catch{
    console.log("Error creating user table.")

}
};


export default createUsersTable;