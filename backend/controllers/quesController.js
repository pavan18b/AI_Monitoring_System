import asyncHandler from "express-async-handler";
import Question from "../models/quesModel.js";

// ✅ CREATE QUESTION
export const createQuestion = asyncHandler(async (req, res) => {
  const { examId, question, options, correctAnswer } = req.body;

  console.log("BODY RECEIVED:", req.body); // 🔥 DEBUG

  if (!examId || !question || !options || correctAnswer === undefined) {
    res.status(400);
    throw new Error("All fields required");
  }

  const newQuestion = await Question.create({
    exam: examId,
    question,
    options,
    correctAnswer: Number(correctAnswer), // ✅ FORCE NUMBER
  });

  res.status(201).json(newQuestion);
});

// ✅ GET QUESTIONS
export const getQuestionsByExamId = asyncHandler(async (req, res) => {
  const questions = await Question.find({ exam: req.params.examId });

  console.log("DB QUESTIONS:", questions); // 🔥 DEBUG

  res.json(questions);
});