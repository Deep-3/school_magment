// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classcontrollers');
const { authenticate, authorize } = require('../middleware/authmiddleware');

// Routes
router.post('/',authenticate,authorize(['admin']), classController.createClass);
router.get('/',authenticate,authorize(['admin']), classController.getClass);
router.put('/:id', authenticate,authorize(['admin']), classController.updateClass);
router.delete('/:id', authenticate,authorize(['admin']), classController.deleteClass);

module.exports = router;
