const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.Role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' })
    }
    next()
  }
}

module.exports = roleMiddleware
