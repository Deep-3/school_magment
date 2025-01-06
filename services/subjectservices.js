const Subject= require('../models/subject');
const Class=require('../models/class')

exports.createSubject = async (classData) => {

    const existing = await Subject.findOne({where:{subjectname:classData.subjectname}});
    // console.log("helo",existing);
    if (existing) {
      return 'A subject already exists.';
    }
  return await Subject.create(classData);


};

exports.getSubject = async (filters = {}) => {
    return await Subject.findAll({
      include:{
        model:Class,
        attributes:['name'],
        through:{attributes:[]}
      }
    });
  };