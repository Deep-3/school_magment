const pdf = require('html-pdf');
const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

hbs.registerHelper('lt', function (value1, value2) {
  return value1 < value2;
});

exports.exportToPDF = async (res, data, templateName, filename) => {
  console.log(__dirname);
  const templatePath = path.resolve(__dirname, `../templates/${templateName}`);
  console.log(templatePath);
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = hbs.compile(templateHtml);



  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'deepkalathiya03@gmail.com',
      pass: 'odqa syft ltpx ghyf'
    }
  });

  async function sendAttendanceEmails(students) {
    try {
      for (const student of students) {
        const Html = compiledTemplate({
          studentid: student.studentid,
          name: student.name,
          subject: student.subject,
          attended_classes: student.attended_classes,
          total_classes: student.total_classes,
          attendance_percentage: student.attendance_percentage,
        });

        const mailOptions = {
          from: 'deepkalathiya03@gmail.com',
          to: student.parentmail,
          subject: `Attendance Report for ${student.name}`,
          html: Html,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to parent of ${student.name}`);
      }
      res.json('All emails sent successfully!');
    } catch (error) {
      res.status(500).json({ error })
    }
  }
  sendAttendanceEmails(data);

};