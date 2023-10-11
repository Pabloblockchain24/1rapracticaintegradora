const mongoose = require("mongoose")
const productCollection = "productos"

const productSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    categoria: String
})

const productModel = mongoose.model(productCollection,productSchema)

module.exports = { productModel }