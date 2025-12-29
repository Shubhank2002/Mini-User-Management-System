const express=require('express')
const { SignUp, Login, getCurrentUser } = require('../Controllers/AuthController')
const authMiddleware = require('../Middlewares/Auth')
const AuthRoutes=express.Router()

AuthRoutes.post('/signup',SignUp)

AuthRoutes.post('/login',Login)

AuthRoutes.get('/me',authMiddleware,getCurrentUser)

module.exports=AuthRoutes