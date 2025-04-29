import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Redirect to login if the user is not authenticated
  return user ? children : <Navigate to="/login" />;
}