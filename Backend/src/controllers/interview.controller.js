
const { PDFParse } = require("pdf-parse");

const {generateInterviewReport, generateResumePdf} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
  let parser;

  try {
    // 1. Validate authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    // 2. Validate uploaded file
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        message: "Please upload a resume PDF.",
      });
    }

    // 3. Validate form data
    const { selfDescription, jobDescription } = req.body;

    if (
      typeof selfDescription !== "string" ||
      !selfDescription.trim() ||
      typeof jobDescription !== "string" ||
      !jobDescription.trim()
    ) {
      return res.status(400).json({
        message: "Self description and job description are required.",
      });
    }

    // 4. Extract text from PDF using pdf-parse v2
    parser = new PDFParse({
      data: new Uint8Array(req.file.buffer),
    });

    const pdfResult = await parser.getText();
    const resumeText = pdfResult.text?.trim();

    if (!resumeText) {
      return res.status(400).json({
        message: "No readable text found in the uploaded PDF.",
      });
    }

    // 5. Generate report using Gemini
    const reportData = await generateInterviewReport({
      resume: resumeText,
      selfDescription: selfDescription.trim(),
      jobDescription: jobDescription.trim(),
    });

    // 6. Save data matching the Mongoose schema
    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription: selfDescription.trim(),
      jobDescription: jobDescription.trim(),

      matchScore: reportData.matchScore,
      technicalQuestion: reportData.technicalQuestion,
      behavioralQuestion: reportData.behavioralQuestion,
      skillGap: reportData.skillGap,
      preparationPlan: reportData.preparationPlan,
      title: reportData.title,
    });

    // 7. Return the created report
    return res.status(201).json({
      success: true,
      message: "Interview report created successfully.",
      interviewReport,
    });
  } catch (error) {
    console.error("Generate interview report error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate interview report.",
      error: error.message,
    });
  } finally {
    if (parser) {
      try {
        await parser.destroy();
      } catch (cleanupError) {
        console.error("PDF parser cleanup error:", cleanupError);
      }
    }
  }
}

async function getInterviewReportByIdController(req,res) {
  const {interviewId} = req.params;
  const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})
  if(!interviewReport){
    return res.status(401).json({
      message: "Interview report not found"
    })
  }

  res.status(200).json({
    message: "Interview report fatch successfull",
    interviewReport
  })
}

async function getAllInterviewReportController(req, res) {
  const interviewReport = await interviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestion -behavioralQuestion -skillGap -preparationPlan")
  res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReport
    })
}



/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

module.exports = {
  generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportController, generateResumePdfController};
