const express = require('express');
const OrderController = require('../controllers/OrderController'); 
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Routes accessible by customers
router.get('/orders', authMiddleware, OrderController.getAllProducts); // Get all products
router.get('/orders/:id', authMiddleware, OrderController.getProductById); // Get a product by its ID

// Private routes (for creating, updating, and deleting products)
router.post('/orders', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderController.createProduct); // Create a new product (only accessible by Manager, Owner, or Chef)
router.put('/orders/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderController.updateProduct); // Update an existing product (only accessible by Manager, Owner, or Chef)
router.delete('/orders/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderController.deleteProduct); // Delete a product (only accessible by Manager, Owner, or Chef)

module.exports = router;