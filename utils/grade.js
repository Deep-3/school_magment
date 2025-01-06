const pdf = require('html-pdf');
const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');



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

    async function sendGradeEmails(gradeData) {
        // res.json(gradeData)
        try {
            for (const grade of gradeData) {
                const Html = compiledTemplate({
                    studentid: grade.Student.studentid,
                    name: grade.Student.name,
                    subjectname: grade.Subject.subjectname,
                    grade: grade.grade
                });
                console.log(grade.Student.parentmail);
                const mailOptions = {
                    from: 'deepkalathiya03@gmail.com',
                    to: grade.Student.parentmail,
                    subject: `Grade reports for ${grade.Student.name}`,
                    html: Html,
                };
                // console.log(Html);
                await transporter.sendMail(mailOptions);
                console.log(`Email sent to parent of ${grade.Student.name}`);
            }
            res.json('All emails sent successfully!');
        } catch (error) {
            res.status(500).json({ error })
        }
    }
    sendGradeEmails(data);

};