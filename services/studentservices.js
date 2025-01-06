// services/userService.js
const Student= require('../models/student');
const Subject= require('../models/subject');
const TeacherSubject=require('../models/teacherassign');
const User=require('../models/user');
const Class=require('../models/class');


const bcrypt = require('bcrypt');

exports.createStudent = async (classData) => {

    const existing = await Student.findOne({where:{name:classData.name}});
    // console.log("helo",existing);
    if (existing) {
      return 'A Studeny already exists.';
    }
    classData.password = await bcrypt.hash(classData.password, 10);

  const tech= await Student.create(classData);
  const user=await User.create({
    username:classData.name,
    password:classData.password,
    role:'student'

  });
  return tech;
};

exports.updateStudent = async (studentid, classData) => {
  const cls=await Student.findByPk(studentid);
  const user=await User.findOne({where:{username:cls.name}});
  console.log(cls);
  if(!await Student.findOne({where:{name:classData.name}}) && !await User.findOne({where:{username:classData.name}}))
  {
  cls.name=classData.name|| cls.name;
  user.username=classData.name ||user.username;
  }

   await user.save();
  return await cls.save();

};

exports.deleteStudent = async (studentid) => {
  return await Student.destroy({ where: { studentid } });
};

exports.getStudent = async () => {
  return  await Student.findAll({
    include:{
      model:Class,
      attributes:['name']
    }
  });
};
