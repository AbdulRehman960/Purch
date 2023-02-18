const express=require('express')
const mongoose=require("mongoose")
var morgan = require('morgan')
const app=express()
const wallRouter=require('./routers/wallpaper')
const videoRouter=require('./routers/videos')

mongoose.connect('mongodb://127.0.0.1:27017/among',{useNewUrlParser:true,useUnifiedTopology: true},()=>{
    console.log('connected to mongoDB!')
})

app.use(morgan('combined'))
app.use(express.json())
app.use(wallRouter)
app.use(videoRouter)
app.get('/ali',async(req,res)=>{
    res.send('ali')
})


app.listen(80,()=>{
    console.log("Server Is Up!")
})