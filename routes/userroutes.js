// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontrollers');
const { authenticate, authorize } = require('../middleware/authmiddleware');

// Routes
router.post('/',authenticate,authorize(['admin']), userController.createUser);
router.get('/',authenticate,authorize(['admin']), userController.getUsers);
router.put('/:id', authenticate,authorize(['admin']), userController.updateUser);
router.delete('/:id', authenticate,authorize(['admin']), userController.deleteUser);

module.exports = router;
