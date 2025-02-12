const express = require('express');
const OrderItemController = require('../controllers/OrderItemController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the authentication middleware
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Import the role-based middleware

const router = express.Router();
const privateRouter = express.Router(); // Nested router for authenticated users

// Public routes (Customers can access only ID, OrderId, and ProductId)
router.get('/', OrderItemController.getPublicOrderItems);
router.get('/:id', OrderItemController.getPublicOrderItemById);

// Protect all routes below with authentication middleware
router.use(authMiddleware);

// Nested route for authenticated users (full order item details)
privateRouter.get('/', OrderItemController.getAllOrderItems);
privateRouter.get('/:id', OrderItemController.getOrderItemById);

// Private routes for Admin roles (Manager, Owner, Chef)
privateRouter.post('/', roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.createOrderItem);
privateRouter.put('/:id', roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.updateOrderItem);
privateRouter.delete('/:id', roleMiddleware('Manager', 'Owner', 'Chef'), OrderItemController.deleteOrderItem);

// Mount the nested private router
router.use('/private', privateRouter);

module.exports = router;