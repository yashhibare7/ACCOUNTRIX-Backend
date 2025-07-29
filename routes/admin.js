import express from 'express';
import { createUserByAdmin, createProductByAdmin, assignProductToUser, getUsers, getProducts, getAssignments, getUserAssignments } from '../controllers/adminController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
const router = express.Router();

router.post('/user', authenticate, isAdmin, createUserByAdmin);
router.post('/product', authenticate, isAdmin, createProductByAdmin);
router.post('/assign', authenticate, isAdmin, assignProductToUser);
router.get('/users', authenticate, isAdmin, getUsers);
router.get('/products', authenticate, isAdmin, getProducts);
router.get('/assignments', authenticate, isAdmin, getAssignments);
router.get('/user-assignments/:userId', authenticate, isAdmin, getUserAssignments);

export default router; 