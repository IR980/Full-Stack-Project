const { Router } = require("express")
const authController = require('../controllers/auth.controller')
const auhtRouter = Router()
const authMiddleware = require("../middlewares/auth.middleware")
// @route POST - /api/auth/register
auhtRouter.post('/register', authController.userRegister)

// routes POST = api/auth/login
auhtRouter.post('/login', authController.userLogin)

// routes GET - /api/auth/logout
auhtRouter.get("/logout", authController.userLogout)

// routes GET - /api/auth/get-me
auhtRouter.get("/get-me",authMiddleware.auhtUser, authController.getMe)



module.exports = auhtRouter;