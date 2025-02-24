const express = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Middleware for authentication
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Middleware for role-based access

const router = express.Router();
const productRouter = express.Router(); // Nested router for products

// Public route (Customers can see only ID and Name)
router.get('/', ProductController.getPublicProducts); // Get only ID and Name
router.get('/:id', ProductController.getPublicProductById); // Get only ID and Name of a single product

// Nested route for authenticated users
router.use(authMiddleware); // Protect all routes below this line

// Private route (Authenticated users can see full product details)
productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/:id', ProductController.getProductById);

// Private routes for Admin roles (Manager, Owner, Chef)
productRouter.use(roleMiddleware('Manager', 'Owner', 'Chef')); // Apply roleMiddleware to all following routes
productRouter.post('/', ProductController.createProduct);
productRouter.put('/:id', ProductController.updateProduct);
productRouter.delete('/:id', ProductController.deleteProduct);

router.use('/private', productRouter); // Mount nested routes under `/private`

module.exports = router;