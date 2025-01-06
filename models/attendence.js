const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./student');
const Class=require('./class');
const Subject=require('./subject');

const Attendance = sequelize.define('Attendance', {
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true

  },
  studentid: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'studentid',
    },
    allowNull: false,
  },
  classid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Class,
      key: 'classid',
    },
  },
  subjectid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subject,
      key: 'subjectid',
    },
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('present', 'absent'),
    allowNull: false,
  },
});

Attendance.belongsTo(Student,{foreignKey:'studentid'});
Attendance.belongsTo(Subject,{foreignKey:'subjectid'});
Attendance.belongsTo(Class,{foreignKey:'classid'});


module.exports = Attendance;
