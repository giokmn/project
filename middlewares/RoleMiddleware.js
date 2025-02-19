// roleMiddleware checks if the user has one of the allowed roles for the route.
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if the 'user' object is available on the request (i.e., if the user is authenticated).
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' }) // If no user is authenticated, deny access.
    }

    // Check if the user's role is included in the list of allowed roles.
    if (!allowedRoles.includes(req.user.Role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' }) // If user's role is not allowed, deny access.
    }

    // If the user is authenticated and has an allowed role, proceed to the next middleware or route handler.
    next()
  }
}

module.exports = roleMiddleware