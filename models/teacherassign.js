const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Teacher = require('./teacher');
const Class = require('./class');
const Subject = require('./subject');

const TeacherAssignment = sequelize.define('TeacherAssignment', {
  teacherid: {
    type: DataTypes.INTEGER,
    references: { model: Teacher, key: 'teacherid' },
  },
 
  subjectid: {
    type: DataTypes.INTEGER,
    references: { model: Subject, key: 'subjectid' },
  }
});

// Teacher model

// Explicitly define Subject relation
Subject.belongsToMany(Teacher, { through: TeacherAssignment, foreignKey: 'subjectid' });
Teacher.belongsToMany(Subject,{ through: TeacherAssignment, foreignKey: 'teacherid'})



module.exports = TeacherAssignment;
