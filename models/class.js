const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Class = sequelize.define('Class', {
    classid:{type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Class;
