const express = require('express');
const ContactUsRecordController = require('../controllers/ContactUsRecordController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the existing authentication middleware
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Routes accessible by customers
router.get('/', authMiddleware, ContactUsRecordController.getAllContactUsRecords); // Get all order records (accessible by authenticated users)
router.get('/:id', authMiddleware, ContactUsRecordController.getContactUsRecordById); // Get a specific order record by ID (accessible by authenticated users)

// Private routes (for creating, updating, and deleting order records)
router.post('/', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), ContactUsRecordController.createContactUsRecord); // Create a new order record (only accessible by Manager, Owner, or Chef)
router.put('/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), ContactUsRecordController.updateContactUsRecord); // Update an existing order record (only accessible by Manager, Owner, or Chef)
router.delete('/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), ContactUsRecordController.deleteContactUsRecord); // Delete an order record (only accessible by Manager, Owner, or Chef)

module.exports = router;