// src/middleware/admin.js

/**
 * Allows the request to proceed only if req.user.role === 'admin'.
 * Assumes auth middleware has already run and set req.user.
 * Returns 403 Forbidden otherwise.
 */
export default function admin(req, res, next) {
    // If no user or role is not 'admin', forbid access
    if (!req.user || req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Access denied: admin credentials required' });
    }
    // User is admin, continue
    next();
  }
  