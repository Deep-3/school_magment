const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust path based on your structure
const Student = require('./student');
const Subject = require('./subject');

const Grade = sequelize.define('Grade', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'studentid',
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
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateRecorded: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Grade.belongsTo(Student, { foreignKey: 'studentid' });
Student.hasMany(Grade,{foreignKey:'studentid'});
Grade.belongsTo(Subject, { foreignKey: 'subjectid' });

module.exports = Grade;
