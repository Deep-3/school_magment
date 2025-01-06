const pdf = require('html-pdf');
const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');
const nodemailer=require('nodemailer');



exports.classReportToPDF = async(res, data,student, templateName, filename) => {
    console.log(__dirname);
    const templatePath = path.resolve(__dirname, `../templates/${templateName}`);
    console.log(templatePath);
    const templateHtml = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = hbs.compile(templateHtml);
    const html=compiledTemplate({
      classid:data.classid,
      name:data.name,
      Students:student
    }
    );
   

    pdf.create(html).toStream((err, stream) => {
        if (err) return res.status(500).send('Failed to generate PDF');
        res.attachment(filename);
        stream.pipe(res);
    });

    
    
};