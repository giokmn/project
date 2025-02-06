const express = require('express')
const UserController = require('../controllers/UserController')
const authMiddleware = require('../middlewares/AuthMiddleware') // Import the authentication middleware
const roleMiddleware = require('../middlewares/RoleMiddleware') // Import the role-based middleware

const router = express.Router()

// Public route (everyone can login)
router.post('/loginuser', UserController.loginUser) // User login

// Private routes (only logged-in users can access)
router.get('/users', authMiddleware, UserController.getAllUsers) // Get all users
router.get('/users/:id', authMiddleware, UserController.getUserById) // Get a user by their ID

// Private + Admin-only route
router.post('/registeruser', authMiddleware, roleMiddleware('Manager', 'Owner'), UserController.createUser) // Register a new user (only accessible by Manager or Owner)
router.put('/users/:id', authMiddleware, roleMiddleware('Manager', 'Owner'), UserController.updateUser) // Update a user (only accessible by Manager or Owner)
router.delete('/users/:id', authMiddleware, roleMiddleware('Owner'), UserController.deleteUser) // Delete a user (only accessible by Owner)

module.exports = router