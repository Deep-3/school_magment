const loginroutes=require('./routes/loginroutes');
const userroutes=require('./routes/userroutes');
const classroutes=require('./routes/classroutes');
const subjectroutes=require('./routes/subjectroutes');
const addSubjectWithClassroutes=require('./routes/addsubjectwithclassroutes');
const teacherroutes=require('./routes/teacherroutes')
const studentroutes=require('./routes/studentroutes');
const addteacherassign=require('./routes/addtecherassign');
const addattendence=require('./routes/attendenceroutes');
const graderoutes=require('./routes/graderoutes');



const express=require('express');
const app=express();
const port=3000;
app.use(express.json());
app.use('/auth',loginroutes)
app.use('/users',userroutes);
app.use('/class',classroutes);
app.use('/subject',subjectroutes);
app.use('/add',addSubjectWithClassroutes);
app.use('/addteacher',addteacherassign);
app.use('/teacher',teacherroutes);
app.use('/student',studentroutes);
app.use('/attendence',addattendence);
app.use('/grade',graderoutes);


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});