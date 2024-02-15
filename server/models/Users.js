const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema ({
    name: String ,
    email: String,
    age: Number
})

const UserModel = mongoose.model("users", UserSchema) //users le nom de table de base de donnees
module.exports = UserModel; 