const express=require('express')
const authMiddleware = require('../Middlewares/Auth')
const { updateProfile, changePassword } = require('../Controllers/UserController')
const UserRoutes=express.Router()

UserRoutes.patch("/me",authMiddleware,updateProfile)

UserRoutes.patch("/change-password",authMiddleware,changePassword)

module.exports=UserRoutes