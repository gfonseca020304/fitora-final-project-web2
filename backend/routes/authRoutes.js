import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';

const authRoutes = Router();
authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/me', me)

export default authRoutes;
