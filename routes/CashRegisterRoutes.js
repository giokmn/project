const express = require('express');
const OrderItemController = require('../controllers/OrderItemController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Private routes (for reading, creating, updating, and deleting order items in the cash register)
router.get('/cashregister', authMiddleware, roleMiddleware('Manager', 'Owner'), OrderItemController.getAllProducts); // Get all products from the cash register (only accessible by Manager or Owner)
router.get('/cashregister/:id', authMiddleware, roleMiddleware('Manager', 'Owner'), OrderItemController.getProductById); // Get a specific product by ID from the cash register (only accessible by Manager or Owner)
router.post('/cashregister', authMiddleware, roleMiddleware('Manager', 'Owner'), OrderItemController.createProduct); // Create a new product in the cash register (only accessible by Manager or Owner)
router.put('/cashregister/:id', authMiddleware, roleMiddleware('Manager', 'Owner'), OrderItemController.updateProduct); // Update an existing product in the cash register (only accessible by Manager or Owner)
router.delete('/cashregister/:id', authMiddleware, roleMiddleware('Manager', 'Owner'), OrderItemController.deleteProduct); // Delete a product from the cash register (only accessible by Manager or Owner)

module.exports = router;