const express = require('express');
const router = express.Router();
const { addGrade, getGradeReports,classPerfomance } = require('../controllers/gradecontrollers');
const { authenticate, authorize } = require('../middleware/authmiddleware');


// Add or Update Grade
router.post('/',authenticate,authorize(['admin','teacher']),addGrade);

// Fetch Grade Reports (filtered by student or subject)
router.get('/',authenticate,authorize(['admin','teacher']), getGradeReports);
router.get('/classperformance',authenticate,authorize(['admin','teacher']),classPerfomance);

module.exports = router;
