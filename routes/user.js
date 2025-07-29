import express from 'express';
import { getMyAssignments, updateSold } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
const router = express.Router();

router.get('/assignments', authenticate, getMyAssignments);
router.post('/sold', authenticate, updateSold);

export default router; 