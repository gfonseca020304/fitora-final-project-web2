// src/middleware/auth.js

import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * Verifies a JWT sent in the Authorization header (Bearer <token>),
 * and attaches the decoded payload to req.user.
 * Returns 401 if no token, bad format, or invalid/expired.
 */
export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'No authorization header provided' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res
      .status(401)
      .json({ error: 'Invalid authorization format. Use Bearer <token>' });
  }

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded should contain at least { id, email, role }
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Invalid or expired token' });
  }
}
