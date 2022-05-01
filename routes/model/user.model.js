const mongoose = require('mongoose');

const UserSchema = require('../schema/user.schema');

const UserModel = mongoose.model("User", UserSchema);

function createUser(user) {
    return UserModel.create(user);
}

function updateUser(userId,user) {
    return userModel.update({_id:userId},{$set:user});
}

function getUserByUserName(username) {
    return UserModel.findOne({username: username}).exec();
}

module.exports = {
    createUser,
    updateUser,
    getUserByUserName,
}