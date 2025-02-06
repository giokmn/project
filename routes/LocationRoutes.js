const express = require('express');
const LocationController = require('../controllers/LocationController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Routes accessible by customers
router.get('/locations', authMiddleware, LocationController.getAllProducts); // Get all products (location-related)
router.get('/locations/:id', authMiddleware, LocationController.getProductById); // Get a product by its ID (location-related)

// Private routes (for creating, updating, and deleting products)
router.post('/locations', authMiddleware, roleMiddleware('Manager', 'Owner'), LocationController.createProduct); // Create a new product (location-related, only accessible by Manager or Owner)
router.put('/locations/:id', authMiddleware, roleMiddleware('Manager', 'Owner'), LocationController.updateProduct); // Update an existing product (location-related, only accessible by Manager or Owner)
router.delete('/locations/:id', authMiddleware, roleMiddleware('Manager', 'Owner'), LocationController.deleteProduct); // Delete a product (location-related, only accessible by Manager or Owner)

module.exports = router;