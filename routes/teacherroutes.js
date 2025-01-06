// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teachercontrollers');
const { authenticate, authorize } = require('../middleware/authmiddleware');

// Routes
router.post('/',authenticate,authorize(['admin']),teacherController.createTeacher);
router.get('/',authenticate,authorize(['admin']), teacherController.getTeacher);
router.put('/:id', authenticate,authorize(['admin']),teacherController.updateTeacher);
router.delete('/:id', authenticate,authorize(['admin']), teacherController.deleteTeacher);

module.exports = router;
