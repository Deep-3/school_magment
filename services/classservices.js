// services/userService.js
const Class= require('../models/class');
const Subject= require('../models/subject');
const ClassSubject=require('../models/classsubject');

const bcrypt = require('bcrypt');

exports.createClass = async (classData) => {

    const existing = await Class.findOne({where:{name:classData.name}});
    // console.log("helo",existing);
    if (existing) {
      return 'A class already exists.';
    }
  return await Class.create(classData);


};

exports.updateClass = async (classid, classData) => {
  const cls=await Class.findByPk(classid);
  console.log(cls);
  cls.name=classData.name|| cls.name;
  return await cls.save();

};

exports.deleteClass = async (classid) => {
  return await Class.destroy({ where: { classid } });
};

exports.getClass = async () => {
  return  await Class.findAll({
    include: {
      model: Subject
    }
  });
};
