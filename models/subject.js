const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subject = sequelize.define('Subject', {
  subjectid:{type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  subjectname: { type: DataTypes.STRING, allowNull: false},
});

module.exports = Subject;
