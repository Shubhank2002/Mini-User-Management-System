const express=require('express')
const authMiddleware = require('../Middlewares/Auth')
const isAdmin = require('../Middlewares/Admin')
const { getAllUsers, deactivateUser } = require('../Controllers/AdminController')
const AdminRoutes=express.Router()

AdminRoutes.get("/users",authMiddleware,isAdmin,getAllUsers)
AdminRoutes.patch('/users/:id/deactivate',authMiddleware,isAdmin,deactivateUser)


module.exports=AdminRoutes