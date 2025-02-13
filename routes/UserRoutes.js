const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Middleware for authentication
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Middleware for role-based access

const router = express.Router();
const userRouter = express.Router(); // Nested router for authenticated users

// Public route (anyone can login)
router.post('/loginuser', UserController.loginUser); // User login

// Private routes (only authenticated users can access)
router.use(authMiddleware); // Protect all routes below this line

// Routes accessible to all authenticated users
userRouter.get('/', UserController.getAllUsers); // Get all users
userRouter.get('/:id', UserController.getUserById); // Get a user by ID

// Admin-only routes
userRouter.post('/registeruser', roleMiddleware('Manager', 'Owner'), UserController.createUser); // Register a new user
userRouter.put('/:id', roleMiddleware('Manager', 'Owner'), UserController.updateUser); // Update user
userRouter.delete('/:id', roleMiddleware('Owner'), UserController.deleteUser); // Delete user (Owner only)

router.use('/private', userRouter); // Mount nested routes under `/private`

module.exports = router;