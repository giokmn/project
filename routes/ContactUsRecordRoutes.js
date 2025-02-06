const express = require('express');
const OrderItemController = require('../controllers/OrderItemController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Routes accessible by customers
router.get('/records', authMiddleware, OrderItemController.getAllProducts); // Get all order records (accessible by authenticated users)
router.get('/records/:id', authMiddleware, OrderItemController.getProductById); // Get a specific order record by ID (accessible by authenticated users)

// Private routes (for creating, updating, and deleting order records)
router.post('/records', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.createProduct); // Create a new order record (only accessible by Manager, Owner, or Chef)
router.put('/records/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.updateProduct); // Update an existing order record (only accessible by Manager, Owner, or Chef)
router.delete('/records/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.deleteProduct); // Delete an order record (only accessible by Manager, Owner, or Chef)

module.exports = router;