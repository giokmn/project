const express = require('express');
const GroceryController = require('../controllers/GroceryController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Private routes (for reading, creating, updating, and deleting products)
router.get('/', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), GroceryController.getAllGroceries); // Get all products (grocery-related, only accessible by Manager, Owner, or Chef)
router.get('/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), GroceryController.getGroceryById); // Get a product by its ID (grocery-related, only accessible by Manager, Owner, or Chef)
router.post('/', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), GroceryController.createGrocery); // Create a new product (grocery-related, only accessible by Manager, Owner, or Chef)
router.put('/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), GroceryController.updateGrocery); // Update an existing product (grocery-related, only accessible by Manager, Owner, or Chef)
router.delete('/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), GroceryController.deleteGrocery); // Delete a product (grocery-related, only accessible by Manager, Owner, or Chef)

module.exports = router;