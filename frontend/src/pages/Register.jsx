import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      await register(email, password);
      nav('/');
    } catch (e) {
      setErr(e.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 300, margin: '2rem auto' }}>
      <h2>Register</h2>
      {err && <p style={{color:'red'}}>{err}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      /><br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      /><br/>
      <button type="submit">Register</button>
    </form>
  );
}
