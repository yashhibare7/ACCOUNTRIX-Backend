import pool from '../config/db.js';

export const assignProduct = async (user_id, product_id, quantity_assigned) => {
  const [result] = await pool.query(
    'INSERT INTO assignments (user_id, product_id, quantity_assigned) VALUES (?, ?, ?)',
    [user_id, product_id, quantity_assigned]
  );
  return result.insertId;
};

export const getAssignmentsByUser = async (user_id) => {
  const [rows] = await pool.query(
    `SELECT a.id, p.name as product_name, a.quantity_assigned, a.quantity_sold
     FROM assignments a
     JOIN products p ON a.product_id = p.id
     WHERE a.user_id = ?`,
    [user_id]
  );
  return rows;
};

export const updateQuantitySold = async (assignment_id, quantity_sold) => {
  const [result] = await pool.query(
    'UPDATE assignments SET quantity_sold = ? WHERE id = ?',
    [quantity_sold, assignment_id]
  );
  return result.affectedRows;
};

export const getAllAssignments = async () => {
  const [rows] = await pool.query(
    `SELECT a.id, u.name as user_name, p.name as product_name, a.quantity_assigned, a.quantity_sold
     FROM assignments a
     JOIN users u ON a.user_id = u.id
     JOIN products p ON a.product_id = p.id`
  );
  return rows;
}; 