
const { PDFParse } = require("pdf-parse");

const generateInterviewReport = require("../services/ai.service");
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

module.exports = {
  generateInterviewReportController,
};
