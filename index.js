const fs=require('fs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors=require('cors')
const path =require('path')
const multer=require('multer')
const { response } = require('express')
require('dotenv').config()
var storage =multer.diskStorage({
    destination:function(request,file,callback){
        callback(null,'./uploads')
    },
    filename:function(request,file,callback){
        console.log(file)
        callback(null,file.fieldname + '-' +Date.now()+path.extname(file.originalname))
    }
})

const upload =multer({storage :storage})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (request,response)=>{

    var port =process.env.PORT
    response.end("welcome to the home page again " +port)


})
app.get('/addUser',(request,response)=>{
    console.log("Below is posted Data")
    console.log(request.query.name)
    response.end("Welcome to Add User using get method")
})

// app.post('/addUser',upload.single('proile_picture'),(request,response)=>{

app.post('/addUser',upload.fields([{name:'profile'},{name:'cv'}]),(request,response)=>{
    console.log("Below is posted Data")
    console.log(request.body)
    console.log("Below is single uploaded file")
    console.log(request.file)
    console.log("Below is multiple uploaded files")
    console.log(request.files)
    console.log("name = "+request.body.name)
    console.log("experience = "+request.body.experience)
    response.end("Welcome to the Add user using post method")

})
app.use((error,request,response,next)=>{
    const message =`This is unexpected field =>"${error.fields}`
    console.log(message)
    response.status(404).send(message)
})

app.listen(process.env.PORT, () => {
    console.log(`server is listining at ${process.env.PORT}`)
})


