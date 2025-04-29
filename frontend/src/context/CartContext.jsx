import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const { data } = await api.get('/cart');
            setItems(data.items);
        };
        fetchCart();
    }, []);

    const add = async (mealId) => {
        const { data } = await api.post('/cart/add', { mealId });
        setItems(data.items);
    };

    const clear = async () => {
        await api.delete('/cart/clear');
        setItems([]);
    };

    return (
        <CartContext.Provider value={{ items, add, clear }}>
            {children}
        </CartContext.Provider>
    );
}