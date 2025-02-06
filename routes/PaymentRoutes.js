const express = require('express');
const PaymentController = require('../controllers/PaymentController');
const { authMiddleware } = require('../middlewares/authMiddleware'); // Import the authentication middleware
const roleMiddleware = require('../middlewares/roleMiddleware'); // Import the role-based middleware (optional, if needed)

const router = express.Router();

// Public routes for payment options (only GET, accessible to everyone)
router.get('/payments', authMiddleware, PaymentController.getAllPayments); // Get all payment options
router.get('/payments/:id', authMiddleware, PaymentController.getPaymentById); // Get a payment option by its ID

// Routes for manipulating payment options (private, only for admins)
router.post('/payments', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), PaymentController.createPayment); // Add a new payment option
router.put('/payments/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), PaymentController.updatePayment); // Update a payment option
router.delete('/payments/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), PaymentController.deletePayment); // Delete a payment option

module.exports = router;