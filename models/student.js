const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Class = require('./class');

const Student = sequelize.define('Student', {
    studentid:{type:DataTypes.INTEGER
        ,primaryKey:true,
        autoIncrement:true
    },
  name: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  classid: { 
    type: DataTypes.INTEGER,
    references: { model: Class, key: 'classid' },
    allowNull: true 
  },
  parentmail:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:'dppatel0385@gmail.com'
  },
  role: { type: DataTypes.ENUM('student'),defaultValue:'student', allowNull: false },
  dateOfBirth: { type: DataTypes.DATEONLY, allowNull: true },
});

Class.hasMany(Student, { foreignKey: 'classid' });
Student.belongsTo(Class, { foreignKey: 'classid' });

module.exports = Student;
