import pool from "../config/db.js";

export const createProductService = async (
  title,
  description,
  image_url,
  price,
  category,
  stock
) => {
  const result = await pool.query(
    `
    INSERT INTO products (title, description, image_url, price, category, stock)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [title, description, image_url, price, category, stock]
  );

  return result.rows[0];
};

export const getAllProductsService = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM products
    ORDER BY id ASC
    `
  );

  return result.rows;
};

export const getProductByIdService = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM products
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

export const updateProductService = async (
  id,
  title,
  description,
  image_url,
  price,
  category,
  stock
) => {
  const result = await pool.query(
    `
    UPDATE products
    SET title = $1,
        description = $2,
        image_url = $3,
        price = $4,
        category = $5,
        stock = $6
    WHERE id = $7
    RETURNING *
    `,
    [title, description, image_url, price, category, stock, id]
  );

  return result.rows[0];
};

export const deleteProductService = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM products
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
};