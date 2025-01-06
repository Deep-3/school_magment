
const Class=require('../models/class');
const Subject=require('../models/subject');

exports.addSubjectWithClass=async (req, res) => {
    const { classid } = req.body; 
    const { subjectid } = req.body; 
    if (subjectid.length === 0) {
      return res.status(400).json({ error: 'subjectid must be a non-empty array' });
    }
  
    // Fetch the class instance
    const classInstance = await Class.findByPk(classid);
  
    if (!classInstance) {
      return res.status(404).json({ error: 'Class not found' });
    }
  
    try {
      const subjects = await Subject.findAll({
        where: {
          subjectid
        }
      });
  
      if (subjects.length !== subjectid.length) {
        return res.status(404).json({ error: 'Some subjects were not found' });
      }
  
      await classInstance.addSubjects(subjects);
  
      return res.status(200).json({ message: 'Subjects assigned to class successfully' });
    } catch (error) {
      return res.status(500).json({ error});
    }
  };
  