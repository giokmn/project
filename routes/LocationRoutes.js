const express = require('express');
const LocationController = require('../controllers/LocationController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Routes accessible by customers
router.get('/', authMiddleware, LocationController.getAllLocations); // Get all products (location-related)
router.get('/:id', authMiddleware, LocationController.getLocationById); // Get a product by its ID (location-related)

// Private routes (for creating, updating, and deleting products)
router.post('/', authMiddleware, roleMiddleware('Manager', 'Owner'), LocationController.createLocation); // Create a new product (location-related, only accessible by Manager or Owner)
router.put('/:id', authMiddleware, roleMiddleware('Manager', 'Owner'), LocationController.updateLocation); // Update an existing product (location-related, only accessible by Manager or Owner)
router.delete('/:id', authMiddleware, roleMiddleware('Manager', 'Owner'), LocationController.deleteLocation); // Delete a product (location-related, only accessible by Manager or Owner)

module.exports = router;