const express = require('express');
const ContactUsRecordController = require('../controllers/ContactUsRecordController');
const authMiddleware = require('../middlewares/AuthMiddleware'); // Middleware for authentication
const roleMiddleware = require('../middlewares/RoleMiddleware'); // Middleware for role-based access

const router = express.Router();
const privateRouter = express.Router(); // Nested router for authenticated users

// Public routes (Customers can see only Id, Message, and Response)
router.get('/', ContactUsRecordController.getPublicContactUsRecords);
router.get('/:id', ContactUsRecordController.getPublicContactUsRecordById);

// Private routes (Authenticated Customers & Users can see full details)
privateRouter.use(authMiddleware);
privateRouter.get('/', ContactUsRecordController.getAllContactUsRecords);
privateRouter.get('/:id', ContactUsRecordController.getContactUsRecordById);

// Private routes for Admin roles (Manager, Owner, Chef)
privateRouter.post('/', roleMiddleware('Manager', 'Owner', 'Chef'), ContactUsRecordController.createContactUsRecord);
privateRouter.put('/:id', roleMiddleware('Manager', 'Owner', 'Chef'), ContactUsRecordController.updateContactUsRecord);
privateRouter.delete('/:id', roleMiddleware('Manager', 'Owner', 'Chef'), ContactUsRecordController.deleteContactUsRecord);

router.use('/private', privateRouter); // Mount nested routes under `/private`

module.exports = router;