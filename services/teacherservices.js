// services/userService.js
const Teacher= require('../models/teacher');
const Subject= require('../models/subject');
const TeacherSubject=require('../models/teacherassign');
const User=require('../models/user');
const Class=require('../models/class');
const TeacherAssignment=require('../models/teacherassign')


const bcrypt = require('bcrypt');
const Student = require('../models/student');

exports.createTeacher = async (classData) => {

    const existing = await Teacher.findOne({where:{name:classData.name}});
    // console.log("helo",existing);
    if (existing) {
      return 'A teacher already exists.';
    }
    classData.password = await bcrypt.hash(classData.password, 10);
  const tech= await Teacher.create(classData);
  const user=await User.create({
    username:classData.name,
    password:classData.password,
    role:'teacher'
  });

  return tech;

};

exports.updateTeacher = async (teacherid, classData) => {
  const cls=await Teacher.findByPk(teacherid);
  const user=await User.findOne({where:{username:cls.name}});
  console.log(cls);

if(!await Teacher.findOne({where:{name:classData.name}}) && !await User.findOne({where:{username:classData.name}}))
  {
  cls.name=classData.name|| cls.name;
  user.username=classData.name ||user.username;
  }

   await user.save(); 
    return await cls.save();

};

exports.deleteTeacher = async (teacherid) => {
  return await Teacher.destroy({ where: { teacherid } });
};

exports.getTeacher = async () => {
  return  await Teacher.findAll({
    include: [
      {
        model: Subject,
        through:{attributes:[]},
        attributes:['subjectid','subjectname'],
        include:{
          model:Class,
          through:{attributes:[]},
          attributes:['name']
        }
      }
      
     ]})
        
};


