const { Router } = require("express")
const authController = require('../controllers/auth.controller')
const auhtRouter = Router()

// @route POST - /api/auth/register
auhtRouter.post('/register', authController.userRegister)
module.exports = auhtRouter;