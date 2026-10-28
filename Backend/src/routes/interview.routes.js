const express = require("express")
const authMiddleware = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware')


const interviewRouter = express.Router()

// POST - /api/interview
interviewRouter.post("/",authMiddleware.auhtUser, upload.single("resume"), interviewController.generateInterviewReportController)

interviewRouter.get('/report/:interviewId', authMiddleware.auhtUser, interviewController.getInterviewReportByIdController)

interviewRouter.get('/', authMiddleware.auhtUser, interviewController.getAllInterviewReportController)


/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)


module.exports = interviewRouter;