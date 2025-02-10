const express = require('express');
const CashRegisterController = require('../controllers/CashRegisterController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Private routes (for reading, creating, updating, and deleting order items in the cash register)
router.get('/', authMiddleware, roleMiddleware('Manager', 'Owner'), CashRegisterController.getAllCashRegisters); // Get all products from the cash register (only accessible by Manager or Owner)
router.get('/:id', authMiddleware, roleMiddleware('Manager', 'Owner'), CashRegisterController.getCashRegisterById); // Get a specific product by ID from the cash register (only accessible by Manager or Owner)
router.post('/', authMiddleware, roleMiddleware('Manager', 'Owner'), CashRegisterController.createCashRegister); // Create a new product in the cash register (only accessible by Manager or Owner)
router.put('/:id', authMiddleware, roleMiddleware('Manager', 'Owner'), CashRegisterController.updateCashRegister); // Update an existing product in the cash register (only accessible by Manager or Owner)
router.delete('/:id', authMiddleware, roleMiddleware('Manager', 'Owner'), CashRegisterController.deleteCashRegister); // Delete a product from the cash register (only accessible by Manager or Owner)

module.exports = router;