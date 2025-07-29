import pool from '../config/db.js';

export const createProduct = async (name, description) => {
  const [result] = await pool.query(
    'INSERT INTO products (name, description) VALUES (?, ?)',
    [name, description]
  );
  return result.insertId;
};

export const getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
}; 