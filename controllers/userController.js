import { getAssignmentsByUser, updateQuantitySold } from '../models/Assignment.js';

export const getMyAssignments = async (req, res) => {
  try {
    const assignments = await getAssignmentsByUser(req.user.id);
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Get assignments error', error: err.message });
  }
};

export const updateSold = async (req, res) => {
  const { assignment_id, quantity_sold } = req.body;
  try {
    const updated = await updateQuantitySold(assignment_id, quantity_sold);
    res.json({ updated });
  } catch (err) {
    res.status(500).json({ message: 'Update sold error', error: err.message });
  }
}; 