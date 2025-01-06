// services/userService.js
const User= require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (userData) => {
 try {
    const existinguser = await User.findOne({role:userData.role});
    console.log(existinguser);
    if (!existinguser) {
      throw new Error('A user already exists.');
    }
  

  userData.password = await bcrypt.hash(userData.password, 10);
  return await User.create(userData);

}
catch(error)
{
    return error;
}
};


exports.updateUser = async (id, userData) => {
  const user=await User.findByPk(id);
  console.log(user);
  user.username=userData.username|| user.username;
  return await user.save();

};

exports.deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

exports.getUsers = async (filters = {}) => {
  return await User.findAll();
};
