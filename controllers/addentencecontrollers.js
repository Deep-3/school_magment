const Student = require('../models/student');
const Attendance = require('../models/attendence');
const ClassSubject=require('../models/classsubject')
const { exportToPDF } = require('../utils/attendencereport');
const Subject = require('../models/subject');



exports.addAttendence=async (req, res) => {
  const { date, classid, subjectid,absent_students } = req.body;

  try {
      let association = await ClassSubject.findOne({
        where: { classid, subjectid },
      });
      // console.log("association",association);
      if(!association)
        return res.status(404).json({msg:'subject not present in class'})

    const students = await Student.findAll({
      where: { classid },
    });
    const subject = await Subject.findOne({
      where: { subjectid},
    });
    console.log("students",students);
    if(students.length === 0)
      return res.status(404).json({msg:'student not found in class'});
    
    
    const allStudentIds = students.map((student) => student.studentid);
    console.log(allStudentIds)
    // Identify the students who are present (all except those in absent_students)
    const presentStudents = allStudentIds.filter(
      (id) => !absent_students.includes(id)
    );

    // Create attendance records for absent students
    const attendanceData = [
      ...absent_students.map((studentid) => ({
        studentid,
        subjectid,
        classid,
        date,
        status: 'absent',
      })),
      ...presentStudents.map((studentid) => ({
        studentid,
        subjectid,
        classid,
        date,
        status: 'present',
      })),
    ];
  
console.log(attendanceData)
    // Insert attendance records in the database
    await Attendance.bulkCreate(attendanceData);
    res.status(200).send({ message: 'Attendance recorded successfully' });
  
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error recording attendance' });
  }
};

// 2. API to Fetch Attendance Reports
exports.getAttendence=async (req, res) => {
  const { classid,subjectid, date } = req.body;
console.log(date);
 
  try {
    const attendanceReport = await Attendance.findAll({
      where: {
        classid,
        subjectid,
        date
      },
      include: [{
        model: Student,
        attributes: ['studentid', 'name'],
      }],
    });

    const formattedReport = attendanceReport.map((attendance) => ({
      studentid: attendance.Student.studentid,
      subjectid:attendance.subjectid,
      Date:attendance.date,
      name: attendance.Student.name,
      status: attendance.status,
    }));

    res.status(200).json({ attendance_report:formattedReport});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching attendance reports' });
  }
};

exports.calculateAttendence=async (req, res) => {
  const { classid, subjectid } = req.params;

  try {
    const students = await Student.findAll({
      where: { classid },
      attributes: ['studentid', 'name','parentmail']
    });
  console.log(students);
    if (!students.length) {
      return res.status(404).json({ message: 'No students found for this class' });
    }
    const subject = await Subject.findOne({
      where: { subjectid},
    });
    // Calculate total attendance sessions held for the subject in the class
    const totalClasses = await Attendance.count({
      distinct: true,
      col: 'date',
      where: { classid, subjectid },
    });
  
    // Fetch attendance summary for each student
    const attendanceData = await Promise.all(
      students.map(async (student) => {
        const attendedClasses = await Attendance.count({
          where: {
            studentid: student.studentid,
            classid,
            subjectid,
            status: 'present',
          },
        });

        const attendancePercentage = totalClasses
          ? ((attendedClasses / totalClasses) * 100).toFixed(2)
          : 0;

        return {
          studentid: student.studentid,
          name: student.name,
          parentmail:student.parentmail,
          subject:subject.subjectname,
          attended_classes: attendedClasses,
          total_classes: totalClasses,
          attendance_percentage: attendancePercentage,
        };
      })
    );

   return exportToPDF(res,attendanceData,'report.hbs','report.pdf')
  } catch (error) {
    console.error('Error generating subject-wise attendance report:', error);
    res.status(500).json({ message: 'Error generating subject-wise attendance report' });
  }
}