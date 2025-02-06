const express = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Routes accessible by customers
router.get('/products', authMiddleware, ProductController.getAllProducts); // Get all products
router.get('/products/:id', authMiddleware, ProductController.getProductById); // Get a product by its ID

// Private routes (for creating, updating, and deleting products)
router.post('/products', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), ProductController.createProduct); // Create a new product
router.put('/products/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), ProductController.updateProduct); // Update an existing product
router.delete('/products/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), ProductController.deleteProduct); // Delete a product

module.exports = router;