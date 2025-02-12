const express = require('express');
const OrderController = require('../controllers/OrderController'); 
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Routes accessible by customers
router.get('/', authMiddleware, OrderController.getAllOrders); // Get all orders
router.get('/:id', authMiddleware, OrderController.getOrderById); // Get an order by its ID

// Private routes (for creating, updating, and deleting orders)
router.post('/', authMiddleware, OrderController.createOrder); // Create a new order (accessible by Customer)
router.put('/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderController.updateOrder); // Update an existing order (only accessible by Manager, Owner, or Chef)
router.delete('/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), OrderController.deleteOrder); // Delete an order (only accessible by Manager, Owner, or Chef)

module.exports = router;