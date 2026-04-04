import Result from "../models/resultModel.js";
import Question from "../models/quesModel.js";
import asyncHandler from "express-async-handler";

// CREATE RESULT
export const createResult = asyncHandler(async (req, res) => {
  const { exam, answers } = req.body;

  if (!exam || !answers) {
    res.status(400);
    throw new Error("Invalid data");
  }

  const questions = await Question.find({ exam }).sort({ createdAt: 1 });

  let score = 0;

  const formattedQuestions = questions.map((q, i) => {
    if (answers[i] === q.correctAnswer) score++;

    return {
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
    };
  });

  const result = await Result.create({
    user: req.user._id,
    exam,
    answers,
    score,
    total: questions.length,
    questions: formattedQuestions,
  });

  res.status(201).json(result);
});

// STUDENT RESULTS
export const getMyResults = asyncHandler(async (req, res) => {
  const results = await Result.find({ user: req.user._id })
    .populate("exam", "examName")
    .lean();

  res.json(results);
});

// ADMIN → BY EXAM
export const getResultsByExam = asyncHandler(async (req, res) => {
  const results = await Result.find({ exam: req.params.examId })
    .populate("user", "name")
    .populate("exam", "examName")
    .lean();

  res.json(results);
});

// ADMIN → ALL
export const getAllResults = asyncHandler(async (req, res) => {
  const results = await Result.find()
    .populate("user", "name email")
    .populate("exam", "examName")
    .lean();

  res.json(results);
});