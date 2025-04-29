import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { items, clear } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {items.map((item) => (
                        <li key={item.mealId._id} className="cart-item">
                            <span>{item.mealId.name}</span>
                            <span>${item.mealId.price.toFixed(2)} x {item.quantity}</span>
                        </li>
                    ))}
                </ul>
            )}
            <button className="button" onClick={clear}>
                Clear Cart
            </button>
            <button className="button" onClick={() => navigate('/')}>
                Back to Menu
            </button>
        </div>
    );
}

export default Cart;