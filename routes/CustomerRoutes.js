const express = require('express');
const CustomerController = require('../controllers/CustomerController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Import the authentication middleware
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Import the role-based middleware

const router = express.Router();

// Public routes (everyone can register and login)
router.post('/logincustomer', CustomerController.loginCustomer); // User login route
router.post('/registercustomer', CustomerController.createCustomer); // User registration route

// Routes accessible by the customer (self-management) and other users
router.put('/customers/:id', authMiddleware, roleMiddleware('Customer', 'Manager', 'Owner', 'Chef'), CustomerController.updateCustomer); // Update customer details (accessible by Customer, Manager, Owner, or Chef)
router.delete('/customers/:id', authMiddleware, roleMiddleware('Customer', 'Manager', 'Owner', 'Chef'), CustomerController.deleteCustomer); // Delete customer (accessible by Customer, Manager, Owner, or Chef)

// Private routes (only accessible by users with specific roles)
router.get('/customers', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), CustomerController.getAllCustomers); // Get all customers (only accessible by Manager, Owner, or Chef)
router.get('/customers/:id', authMiddleware, roleMiddleware('Manager', 'Owner', 'Chef'), CustomerController.getCustomerById); // Get a specific customer by ID (only accessible by Manager, Owner, or Chef)

module.exports = router;