const express = require("express")
const { productModel } = require("../dao/models/product.model")
const router = express.Router()


router.get("/", async(req,res) => {
    try{
        let products = await productModel.find()
        res.render("index.hbs", {
            products
        })
    }catch(error){
        console.log(error)
    }
})


module.exports = router