import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Menu() {
  const { add } = useContext(CartContext);
  const navigate = useNavigate();
  const [meals, setMeals] = useState(() => {
    const cachedMeals = localStorage.getItem('meals');
    return cachedMeals ? JSON.parse(cachedMeals) : [];
  });
  const [loading, setLoading] = useState(meals.length === 0);

  useEffect(() => {
    if (meals.length === 0) {
      const fetchMeals = async () => {
        try {
          const { data } = await api.get('/foods');
          setMeals(data);
          localStorage.setItem('meals', JSON.stringify(data)); // Cache meals in localStorage
        } catch (error) {
          console.error('Failed to fetch meals:', error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchMeals();
    }
  }, [meals]);

  if (loading) {
    return <p>Loading meals...</p>;
  }

  return (
    <div className="menu">
      <div className="menu-header">
        <button className="button" onClick={() => navigate('/cart')}>
          Go to Cart
        </button>
      </div>
      <div className="menu-items">
        {meals.map((meal) => (
          <div key={meal._id} className="menu-item">
            <h3>{meal.name}</h3>
            <p>${meal.price.toFixed(2)}</p>
            <button className="button" onClick={() => add(meal._id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;