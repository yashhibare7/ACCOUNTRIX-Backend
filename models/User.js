import pool from '../config/db.js';

export const createUser = async (name, email, password, role = 'user') => {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role]
  );
  return result.insertId;
};

export const findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

export const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT id, name, email, role FROM users');
  return rows;
}; 