import { GetCartForUser, AddMealToCart, ClearCartForUser } from '../models/Cart.js';

export const getCart = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in the request
    try {
        const cart = await GetCartForUser(userId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

export const addToCart = async (req, res) => {
    const userId = req.user.id;
    const { mealId } = req.body;

    try {
        const cart = await AddMealToCart(userId, mealId);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add meal to cart' });
    }
};

export const clearCart = async (req, res) => {
    const userId = req.user.id;
    try {
        await ClearCartForUser(userId);
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear cart' });
    }
};