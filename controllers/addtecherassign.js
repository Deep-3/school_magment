const Teacher = require('../models/teacher');
const Class = require('../models/class');
const Subject = require('../models/subject')
const TeacherAssignment=require('../models/teacherassign')

exports.assignTeacherWithSubjectsAndClass = async (req, res) => {
  const { teacherid, subjectid } = req.body;

  if (!teacherid  || subjectid.length === 0) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    // Validate Teacher and Class
    const teacher = await Teacher.findByPk(teacherid);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

    // Fetch Valid Subjects
    const subjects = await Subject.findAll({
      where: { subjectid }
    });

    if (subjects.length !== subjectid.length) {
      return res.status(404).json({ error: 'Some subjects were not found' });
    }


    await Promise.all(subjects.map(async (subject) => {
      // Add Teacher-Subject association
    
        await teacher.addSubjects(subject);
  
      }));

    res.status(200).json({
      success: true,
      message: 'Teacher assigned to subjects in the class successfully'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to assign teacher to subjects in the class' });
  }
};
