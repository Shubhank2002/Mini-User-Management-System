require('dotenv').config()
const express=require('express')
const ConnectDB = require('./config/db')
const app=express()

app.use(express.json())
ConnectDB()

const port=process.env.PORT
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})