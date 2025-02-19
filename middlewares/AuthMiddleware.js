const jwt = require('jsonwebtoken');

// Middleware function to authenticate the user using JWT
const authMiddleware = (req, res, next) => {
  // Retrieve the token from the 'Authorization' header
  const token = req.header('Authorization');

  // If the token is not provided in the request header, deny access
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Remove the 'Bearer ' prefix from the token (if present) and verify it using the JWT secret
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    
    // Store the decoded user information in the 'req' object, so it can be accessed in subsequent middleware/routes
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return a 403 error
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;