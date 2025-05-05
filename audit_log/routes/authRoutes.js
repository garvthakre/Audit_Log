 import express from 'express';
import { signup, login } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/admin-data', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.send('Only admin can see this');
});

export default router;
