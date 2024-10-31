import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = Router();

router.post('/signup', authController.createUser);

export default router;