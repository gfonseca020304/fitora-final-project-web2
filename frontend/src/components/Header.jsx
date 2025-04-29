import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <h1>Fitora</h1>
      {user ? (
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className='auth-links'>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      )}
    </header>
  );
}