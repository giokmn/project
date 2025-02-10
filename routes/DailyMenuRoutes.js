const express = require('express');
const DailyMenuController = require('../controllers/DailyMenuController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Routes accessible by customers
router.get('/', authMiddleware, DailyMenuController.getAllDailyMenus); // Get all daily menu items (accessible by authenticated users)
router.get('/:id', authMiddleware, DailyMenuController.getDailyMenuById); // Get a specific daily menu item by its ID (accessible by authenticated users)

// Private routes (for creating, updating, and deleting daily menu items)
router.post('/', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), DailyMenuController.createDailyMenu); // Create a new daily menu item (only accessible by Manager, Owner, or Chef)
router.put('/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), DailyMenuController.updateDailyMenu); // Update a daily menu item (only accessible by Manager, Owner, or Chef)
router.delete('/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), DailyMenuController.deleteDailyMenu); // Delete a daily menu item (only accessible by Manager, Owner, or Chef)

module.exports = router;