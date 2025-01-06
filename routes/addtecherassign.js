const addssignteacjer=require('../controllers/addtecherassign')
const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authmiddleware');

router.post('/class/teacher/subject',authenticate,authorize(['admin']),addssignteacjer.assignTeacherWithSubjectsAndClass);

module.exports=router;