const express = require('express');
const OrderItemController = require('../controllers/OrderItemController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Routes accessible by customers
router.get('/orderitems', authMiddleware, OrderItemController.getAllProducts); // Get all products
router.get('/orderitems/:id', authMiddleware, OrderItemController.getProductById); // Get a product by its ID

// Private routes (for creating, updating, and deleting products)
router.post('/orderitems', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.createProduct); // Create a new product (only accessible by Manager, Owner, or Chef)
router.put('/orderitems/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.updateProduct); // Update an existing product (only accessible by Manager, Owner, or Chef)
router.delete('/orderitems/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.deleteProduct); // Delete a product (only accessible by Manager, Owner, or Chef)

module.exports = router;