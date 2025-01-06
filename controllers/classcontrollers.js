// controllers/userController.js
const classService = require('../services/classservices');
exports.createClass = async (req, res) => {
  try {
    const data = await classService.createClass(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error});
  }
};

exports.getClass = async (req, res) => {
  try {
    const classname = await classService.getClass();
    res.json({ success: true, data: classname });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.updateClass = async (req, res) => {
  try {
    await classService.updateClass(req.params.id, req.body);
    res.json({ success: true, message: 'class updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    await classService.deleteClass(req.params.id);
    res.json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


