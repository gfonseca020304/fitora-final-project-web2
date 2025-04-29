// src/routes/foodRoutes.js

import { Router } from 'express';
import { FoodItem } from '../models/FoodItem.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = Router();

/**
 * GET /foods
 * Public: List all food items
 */
router.get('/', async (req, res) => {
  try {
    const foods = await FoodItem.findAll();
    res.json(foods);
  } catch (err) {
    console.error('Error fetching foods:', err);
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});


export default router;