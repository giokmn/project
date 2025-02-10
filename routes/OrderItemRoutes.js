const express = require('express');
const OrderItemController = require('../controllers/OrderItemController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Routes accessible by customers
router.get('/', authMiddleware, OrderItemController.getAllOrderItems); // Get all products
router.get('/:id', authMiddleware, OrderItemController.getOrderItemById); // Get a product by its ID

// Private routes (for creating, updating, and deleting products)
router.post('/', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.createOrderItem); // Create a new product (only accessible by Manager, Owner, or Chef)
router.put('/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.updateOrderItem); // Update an existing product (only accessible by Manager, Owner, or Chef)
router.delete('/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.deleteOrderItem); // Delete a product (only accessible by Manager, Owner, or Chef)

module.exports = router;