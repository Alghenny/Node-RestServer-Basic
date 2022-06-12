const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if( !existRole ) {
        throw new Error(`The role: ${role} isn't registered in the DB`);
    }
}

const emailExist = async(email) => {
    const emailExist = await User.findOne({ email });
    if( emailExist ) {
        throw new Error(`The email: ${email} is already registered`);
    }
}

const userExistById = async( id ) => {
    const userExist = await User.findById(id);
    if( !userExist ) {
        throw new Error(`The id: ${id} does not exist`);
    }
}

module.exports = {
    isRoleValid,
    emailExist,
    userExistById
}