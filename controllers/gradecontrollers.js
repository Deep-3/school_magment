const Grade = require('../models/grade');
const Student = require('../models/student');
const Subject = require('../models/subject');
const ClassSubject=require('../models/classsubject');
const Class=require('../models/class');
const { exportToPDF } = require('../utils/grade');
const { classReportToPDF } = require('../utils/classreport');



exports.addGrade = async (req, res) => {
  const { studentid, subjectid, grade } = req.body;

  try {
    const student=await Student.findByPk(studentid);
    if(!student)
      return res.json({msg:'student not found'});
   const classsubject=await ClassSubject.findOne({
    where:{
      classid:student.classid,
      subjectid
    }
   });
   if(!classsubject)
    return res.status(500).json({msg:'student not study this subject'});
    const existingGrade = await Grade.findOne({ where: { studentid, subjectid } });

    if (existingGrade) {
      existingGrade.grade = grade;
      await existingGrade.save();
      return res.status(200).json({ message: 'Grade updated successfully', data: existingGrade });
    }

    const newGrade = await Grade.create({ studentid, subjectid, grade });
    res.status(201).json({ message: 'Grade added successfully', data: newGrade });
  } catch (error) {
    console.error('Error in addGrade:', error);
    res.status(500).json({ error: 'Failed to add/update grade' });
  }
};

exports.getGradeReports = async (req, res) => {
  const { studentid, subjectid } = req.query;

  try {
    const whereClause = {};
    if (studentid) whereClause.studentid = studentid;
    if (subjectid) whereClause.subjectid = subjectid;

    const gradeReports = await Grade.findAll({
      where: whereClause,
      attributes:['grade'],
      include: [
        { model: Student, attributes: ['studentid', 'name','parentmail']},
        { model: Subject, attributes: ['subjectid', 'subjectname'] },
      ],
    });

    if (gradeReports.length === 0) {
      return res.status(404).json({ message: 'No grade records found.' });
    }

     return exportToPDF(res,gradeReports,'grade.hbs')
    // res.status(200).json({ data: gradeReports });
  } catch (error) {
    console.error('Error in getGradeReports:', error);
    res.status(500).json({ error: 'Failed to fetch grade reports' });
  }
};
exports.classPerfomance=async(req,res)=>{
  const {classid}=req.query;
  try{
    const classPerfomance=await Class.findByPk(classid,{attributes:['classid','name'],include:{
      model:Student,attributes:['name'],include:{
        model:Grade,attributes:['grade'],include:{
          model:Subject,attributes:['subjectname']
        }
      }
    }});

    const studentsWithGrades = classPerfomance.Students.map(student => ({
      
      studentName: student.name,
      grades: student.Grades.map(grade => ({
        subject: grade.Subject.subjectname,
        grade: grade.grade
      }))
    
    }));    
    return classReportToPDF(res,classPerfomance,studentsWithGrades,'classreport.hbs','classreport.pdf')
    res.json(studentsWithGrades);
  }
  catch(error)
  {
  res.json({error});
  }
};
