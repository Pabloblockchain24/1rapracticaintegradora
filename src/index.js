const express = require("express")
const { default: mongoose } = require("mongoose")
const userRouter = require("./routes/users.router")
const app = express()
const port = 8080
const productRouter = require("./routes/products.router")
const viewRouter = require("./routes/views.router")
const {messageModel} = require("../src/dao/models/message.model")

const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname, + "/views"))
app.use(express.static(path.join(__dirname, 'public')));

const multer = require("multer")

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, "uploads")
    },
    filename: (req, file, cb) =>{
        const timestamp = Date.now()
        const originalname = file.originalname
        const ext = path.extname(originalname)
        cb(null, `${timestamp}-${originalname}`)
    }
})
const upload = multer({storage})
app.post("/upload", upload.single("archivo"), (req,res)=>{
    res.json({message: "Archivo subido exitosamente"})
})

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb+srv://parcepaivaTest:clusterMongo@clustercoderhouse.unxc6mu.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la base de datos", error);
    })

app.use("/api/views", viewRouter)
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)

app.post('/send', async (req, res) => {
    const message = req.body.message;
    let result = await messageModel.create( {message} )
    res.send({result: "success", payload: result })
});
