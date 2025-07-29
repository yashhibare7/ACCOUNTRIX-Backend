import { createUser, getAllUsers } from '../models/User.js';
import { createProduct, getAllProducts } from '../models/Product.js';
import { assignProduct, getAllAssignments, getAssignmentsByUser } from '../models/Assignment.js';
import bcrypt from 'bcryptjs';

export const createUserByAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const userId = await createUser(name, email, hashed, role);
    res.status(201).json({ userId });
  } catch (err) {
    res.status(500).json({ message: 'User create error', error: err.message });
  }
};

export const createProductByAdmin = async (req, res) => {
  const { name, description } = req.body;
  try {
    const productId = await createProduct(name, description);
    res.status(201).json({ productId });
  } catch (err) {
    res.status(500).json({ message: 'Product create error', error: err.message });
  }
};

export const assignProductToUser = async (req, res) => {
  const { user_id, product_id, quantity_assigned } = req.body;
  try {
    const assignmentId = await assignProduct(user_id, product_id, quantity_assigned);
    res.status(201).json({ assignmentId });
  } catch (err) {
    res.status(500).json({ message: 'Assignment error', error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Get users error', error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Get products error', error: err.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await getAllAssignments();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Get assignments error', error: err.message });
  }
};

export const getUserAssignments = async (req, res) => {
  try {
    const assignments = await getAssignmentsByUser(req.params.userId);
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Get user assignments error', error: err.message });
  }
}; 