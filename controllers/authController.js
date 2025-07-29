import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findByEmail } from '../models/User.js';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await findByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const userId = await createUser(name, email, hashed, role);
    res.status(201).json({ userId });
  } catch (err) {
    console.error('Register error:', err); // Print error to console
    res.status(500).json({ message: 'Register error', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
}; 