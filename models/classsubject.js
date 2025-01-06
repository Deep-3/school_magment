const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Class = require('./class');
const Subject = require('./subject');

const ClassSubject = sequelize.define('ClassSubject', {
  classid: {
    type: DataTypes.INTEGER,
    references: { model: 'classes', key: 'classid' },
  },
  subjectid: {
    type: DataTypes.INTEGER,
    references: { model: 'subjects', key: 'subjectid' },
  },
});

Class.belongsToMany(Subject, { through: ClassSubject,  foreignKey: 'classid'});
Subject.belongsToMany(Class, { through: ClassSubject,  foreignKey: 'subjectid'});

module.exports = ClassSubject;
