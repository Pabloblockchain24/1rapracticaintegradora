const {Router} = require("express")
const {productModel} = require("../dao/models/product.model.js")
const router = Router()

router.get("/", async(req,res) => {
    try{
        let products = await productModel.find()
        res.send({result: "success", payload: products})
    }catch(error){
        console.log(error)
    }
})
router.post("/", async(req,res)=>{
    let {nombre, descripcion, categoria} = req.body

    if(!nombre || !descripcion || !categoria){
        res.send({status:"error", error:"faltan datos"})
    }
    let result = await productModel.create({nombre, descripcion, categoria})
    res.send({result: "success", payload: result })
})

router.put("/:pid", async(req,res)=>{
    let {pid} =  req.params
    let productToReplace = req.body
    if(!productToReplace.nombre || !productToReplace.descripcion || !productToReplace.precio || !productToReplace.categoria){
        res.send({status: "error", error:"no hay datos en parametros"})
    }
    let result = await productModel.updateOne({_id: pid}, productToReplace)
    res.send({result: "success", payload: result })
})

router.delete("/:pid", async(req,res)=>{
    let {pid} = req.params
    let result = await productModel.deleteOne({_id: pid})
    res.send({result: "success", payload: result})
})

module.exports = router