const mongoose = require("mongoose")
const userCollection = "usuarios"

const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    email: String
})

const userModel = mongoose.model(userCollection,userSchema)

module.exports = { userModel }