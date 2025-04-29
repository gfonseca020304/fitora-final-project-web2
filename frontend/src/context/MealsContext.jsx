import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const MealsContext = createContext();

export function MealsProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await api.get('/foods');
        setMeals(data);
      } catch (error) {
        console.error('Failed to fetch meals:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <MealsContext.Provider value={{ meals, loading }}>
      {children}
    </MealsContext.Provider>
  );
}