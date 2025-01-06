// controllers/userController.js
const teacherService = require('../services/teacherservices');
const Subject=require('../models/subject')
exports.createTeacher = async (req, res) => {
  try {
    const data = await teacherService.createTeacher(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error});
  }
};

exports.getTeacher = async (req, res) => {
  try {
    const classname = await teacherService.getTeacher({
      include:{
        model:Subject
      }
    });
    res.json({ success: true, data: classname });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.updateTeacher = async (req, res) => {
  try {
    await teacherService.updateTeacher(req.params.id, req.body);
    res.json({ success: true, message: 'teacher updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await teacherService.deleteTeacher(req.params.id);
    res.json({ success: true, message: 'teacher deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


