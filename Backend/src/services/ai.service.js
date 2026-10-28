const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

if (!process.env.GOOGLE_GENAI_API_KEY) {
  throw new Error("GOOGLE_GENAI_API_KEY is missing from the environment.");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// Reusable schema for interview questions
const questionSchema = z.object({
  question: z.string().min(1),
  intention: z.string().min(1),
  answer: z.string().min(1),
});

// Complete report schema
const interviewReportSchema = z.object({
  matchScore: z.number().min(0).max(100),

  technicalQuestion: z.array(questionSchema),

  behavioralQuestion: z.array(questionSchema),

  skillGap: z.array(
    z.object({
      skill: z.string().min(1),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number().int().min(1),
      focus: z.string().min(1),
      tasks: z.array(z.string()),
    }),
  ),

  title: z.string().min(1),
});

// Wait between retry attempts
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry temporary API failures
async function generateWithRetry(contents, config) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Gemini API attempt ${attempt}/${maxAttempts}`);

      return await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents,
        config,
      });
    } catch (error) {
      const status = Number(error.status ?? error.code);
      const retryable = [429, 500, 502, 503, 504].includes(status);

      if (!retryable || attempt === maxAttempts) {
        throw error;
      }

      const delay = 1000 * 2 ** (attempt - 1);

      console.warn(`Gemini API returned ${status}. Retrying in ${delay}ms.`);

      await sleep(delay);
    }
  }

  throw new Error("Gemini request failed after multiple attempts.");
}

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  if (!resume || !selfDescription || !jobDescription) {
    throw new Error(
      "Resume, self description, and job description are required.",
    );
  }

  const prompt = `
You are an expert technical interviewer and career coach.

Generate an accurate and practical interview preparation report.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF-DESCRIPTION:
${selfDescription}

TARGET JOB DESCRIPTION:
${jobDescription}

INSTRUCTIONS:
1. Calculate a realistic match score from 0 to 100.
2. Generate relevant technical interview questions.
3. Generate relevant behavioral interview questions.
4. Explain the interviewer's intention behind each question.
5. Provide practical sample answers tailored to the candidate.
6. Identify relevant skill gaps with low, medium, or high severity.
7. Create a day-wise interview preparation plan.
8. Give the report a suitable job title.
9. Base your assessment on the supplied information.
10. Do not invent candidate experience or qualifications.
11. Return valid JSON matching the provided schema.
`;

  const response = await generateWithRetry(prompt, {
    responseMimeType: "application/json",
    responseJsonSchema: z.toJSONSchema(interviewReportSchema, {
      target: "draft-07",
    }),
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response.");
  }

  let parsedReport;

  try {
    parsedReport = JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini returned invalid JSON:", error.message);
    throw new Error("Failed to parse the interview report JSON.");
  }

  // Validate generated data before returning it to the controller
  const validatedReport = interviewReportSchema.parse(parsedReport);

  console.log("Interview report generated successfully.");

  // IMPORTANT: Return the object so the controller can save it
  return validatedReport;
}

module.exports = generateInterviewReport;
