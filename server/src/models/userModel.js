import pool from "../config/db.js"

export const createUserService = async (name, email, hashedPassword) => {
    const result = await pool.query(`
        INSERT INTO users (name, email ,password)
        VALUES($1, $2, $3)
        RETURNING id, name ,email, created_at`,
        [name, email, hashedPassword]
    );
    return result.rows[0];
}

export const getUserByEmailService = async (email) => {
    const result = await (`
        SELECT * from users
         where email = $1 
        `, [email]);
    return result.rows[0];
}

export const getUserByIdService = async (id) => {
    const result = await (`
        SELECT id, name, email, created_at
        where id = $1 `,
        [id]);

    return result.rows[0]
}