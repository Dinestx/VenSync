import jwt from 'jsonwebtoken';
import Vendor from '../models/vendor';
import User from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

// Middleware to protect routes
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const baseId = decoded.baseId;
    // Attach user info to the request object
    req.baseId = baseId;

    const user = await User.findOne({ baseId });
    const vendor = await Vendor.findOne({ baseId });

    // Attach userId and vendorId to the request if found
    req.userId = user ? user._id : null;
    req.vendorId = vendor ? vendor._id : null;
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    res.status(403).json({ message: 'Token is invalid or expired' });
  }
};

// Role-based authorization middleware
export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
