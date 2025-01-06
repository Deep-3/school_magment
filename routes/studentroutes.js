// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentcontrollers');
const { authenticate, authorize } = require('../middleware/authmiddleware');

// Routes
router.post('/',authenticate,authorize(['admin','teacher']),studentController.createStudent);
router.get('/',authenticate,authorize(['admin','teacher']), studentController.getStudent);
router.put('/:id', authenticate,authorize(['admin','teacher','student']),studentController.updateStudent);
router.delete('/:id', authenticate,authorize(['admin']), studentController.deleteStudent);

module.exports = router;
