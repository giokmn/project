const express = require('express');
const CustomerController = require('../controllers/CustomerController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Middleware for authentication
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Middleware for role-based access

const router = express.Router();
const customerRouter = express.Router(); // Nested router for authenticated users

// Public routes (anyone can register and login)
router.post('/logincustomer', CustomerController.loginCustomer); // Customer login
router.post('/registercustomer', CustomerController.createCustomer); // Customer registration

// Protect all routes below with authentication
router.use(authMiddleware);

// Customer self-management routes (Customer can update/delete their own data)
customerRouter.put('/:id', roleMiddleware('Customer', 'Manager', 'Owner', 'Chef'), CustomerController.updateCustomer); // Update customer
customerRouter.delete('/:id', roleMiddleware('Customer', 'Manager', 'Owner', 'Chef'), CustomerController.deleteCustomer); // Delete customer

// Admin-only routes (Only Manager, Owner, and Chef can access customer data)
customerRouter.get('/', roleMiddleware('Manager', 'Owner', 'Chef'), CustomerController.getAllCustomers); // Get all customers
customerRouter.get('/:id', roleMiddleware('Manager', 'Owner', 'Chef'), CustomerController.getCustomerById); // Get a specific customer

// Private route for logout (only authenticated users can access it)
customerRouter.post('/logoutcustomer', CustomerController.logoutCustomer); // Customer logout

// Mount private routes under `/private`
router.use('/private', customerRouter);

module.exports = router;