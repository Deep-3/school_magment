const addSubjectWithClass=require('../controllers/addsubjectwithclasscontrollers')
const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authmiddleware');

router.post('/class/subject',authenticate,authorize(['admin']),addSubjectWithClass.addSubjectWithClass);

module.exports=router;