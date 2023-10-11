const mongoose = require("mongoose")
const messageCollection = "mensajes"

const messageSchema = new mongoose.Schema({
    message: String
})

const messageModel = mongoose.model(messageCollection,messageSchema)

module.exports = { messageModel }