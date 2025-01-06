const subjectService = require('../services/subjectservices');
exports.createSubject = async (req, res) => {
  try {
    const data = await subjectService.createSubject(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error});
  }
};

exports.getSubject = async (req, res) => {
  try {
    const data = await subjectService.getSubject();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};