const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Teacher = sequelize.define('Teacher', {
    teacherid:{type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
  name: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: true }, 
  role: { type: DataTypes.ENUM('teacher'),defaultValue:'teacher', allowNull: false },
  dateOfJoining: { type: DataTypes.DATEONLY, allowNull: true },
});

module.exports = Teacher;
