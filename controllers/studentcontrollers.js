// controllers/userController.js
const studentService = require('../services/studentservices');
exports.createStudent = async (req, res) => {
  try {
    const data = await studentService.createStudent(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error});
  }
};

exports.getStudent= async (req, res) => {
  try {
    const data = await studentService.getStudent();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    await studentService.updateStudent(req.params.id, req.body);
    res.json({ success: true, message: 'student updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.json({ success: true, message: 'student deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


