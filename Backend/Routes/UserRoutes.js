const express=require('express')
const authMiddleware = require('../Middlewares/Auth')
const { updateProfile, changePassword } = require('../Controllers/UserController')
const UserRoutes=express.Router()

UserRoutes.patch("/users/me",authMiddleware,updateProfile)

UserRoutes.patch("/users/change-password",authMiddleware,changePassword)

module.exports=UserRoutes