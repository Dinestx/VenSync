import jwt from 'jsonwebtoken';

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

    // Attach user info to the request object
    req.user = decoded.baseId;
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
