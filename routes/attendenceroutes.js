// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const addAttendence = require('../controllers/addentencecontrollers');
const { authenticate, authorize } = require('../middleware/authmiddleware');

// Routes
router.post('/',authenticate,authorize(['admin','teacher']), addAttendence.addAttendence);
router.get('/',authenticate,authorize(['admin','teacher']),addAttendence.getAttendence);
router.get('/:classid/:subjectid',authenticate,authorize(['admin','teacher']),addAttendence.calculateAttendence);

module.exports = router;
