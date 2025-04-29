import express from 'express';
import { getCart, addToCart, clearCart } from '../controllers/cartController.js';
import auth from '../middleware/auth.js'; // Middleware to authenticate users

const cartRoutes = express.Router();

cartRoutes.get('/', auth, getCart);
cartRoutes.post('/add', auth, addToCart);
cartRoutes.delete('/clear', auth, clearCart);

export default cartRoutes;