const express=require('express')
const { SignUp, Login, getCurrentUser, Logout } = require('../Controllers/AuthController')
const authMiddleware = require('../Middlewares/Auth')
const AuthRoutes=express.Router()

AuthRoutes.post('/signup',SignUp)

AuthRoutes.post('/login',Login)

AuthRoutes.get('/me',authMiddleware,getCurrentUser)

AuthRoutes.get('/logout',Logout)

module.exports=AuthRoutes