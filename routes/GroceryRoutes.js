const express = require('express');
const GroceryController = require('../controllers/GroceryController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Private routes (for reading, creating, updating, and deleting products)
router.get('/groceries', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), GroceryController.getAllProducts); // Get all products (grocery-related, only accessible by Manager, Owner, or Chef)
router.get('/groceries/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), GroceryController.getProductById); // Get a product by its ID (grocery-related, only accessible by Manager, Owner, or Chef)
router.post('/groceries', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), GroceryController.createProduct); // Create a new product (grocery-related, only accessible by Manager, Owner, or Chef)
router.put('/groceries/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), GroceryController.updateProduct); // Update an existing product (grocery-related, only accessible by Manager, Owner, or Chef)
router.delete('/groceries/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), GroceryController.deleteProduct); // Delete a product (grocery-related, only accessible by Manager, Owner, or Chef)

module.exports = router;