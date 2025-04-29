import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../models/User.js"
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET;

export async function register(req, res) {
  const { email, password } = req.body;
  if (await User.findOne({ where: { email } }))
    return res.status(400).json({ error: 'Email in use' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET);
  console.log(user)
  res.json({ token });
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET);
    

    res.json({ accessToken: token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export function me(req, res) {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const payload = jwt.verify(auth, SECRET);
    res.json({ user: payload });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
