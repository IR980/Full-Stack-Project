const express = require("express")
const authMiddleware = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware')
const interviewRouter = express.Router()

// POST - /api/interview
interviewRouter.post("/",authMiddleware.auhtUser, upload.single("resume"), interviewController.generateInterviewReportController)
module.exports = interviewRouter;