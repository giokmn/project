const express = require('express');
const DailyMenuController = require('../controllers/DailyMenuController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Routes accessible by customers
router.get('/dailymenus', authMiddleware, DailyMenuController.getAllDailyMenu); // Get all daily menu items (accessible by authenticated users)
router.get('/dailymenus/:id', authMiddleware, DailyMenuController.getProductById); // Get a specific daily menu item by its ID (accessible by authenticated users)

// Private routes (for creating, updating, and deleting daily menu items)
router.post('/dailymenus', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), DailyMenuController.createProduct); // Create a new daily menu item (only accessible by Manager, Owner, or Chef)
router.put('/dailymenus/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), DailyMenuController.updateProduct); // Update a daily menu item (only accessible by Manager, Owner, or Chef)
router.delete('/dailymenus/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), DailyMenuController.deleteProduct); // Delete a daily menu item (only accessible by Manager, Owner, or Chef)

module.exports = router;