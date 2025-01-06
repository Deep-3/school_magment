const express = require('express');
const router = express.Router();
const subjectcontroller = require('../controllers/subjectcontrollers');
const { authenticate, authorize } = require('../middleware/authmiddleware');

// Routes
router.post('/',authenticate,authorize(['admin']), subjectcontroller.createSubject);
router.get('/',authenticate,authorize(['admin']), subjectcontroller.getSubject);

module.exports=router;