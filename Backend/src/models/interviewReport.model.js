const mongoose = require("mongoose")

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    },

}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    },

}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "skill is required"]
    },
    soverity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "soverity is required"]
    }
}, {
    _id: false
})

const preprationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "day is required"]
    },
    focus: {
        type: String,
        required: [true, "focus is required"]
    },
    tasks: [ {
        type: String,
        required: [true, "task is required"]
    } ]
})
const interviewReportSchema = new mongoose.Schema({
    jobDiscription: {
        type: String,
        required: [true, "job description is required"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },

    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preprationPlan: [preprationPlanSchema]
}, {
    timestamps: true
})

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema)
module.exports = interviewReportModel;