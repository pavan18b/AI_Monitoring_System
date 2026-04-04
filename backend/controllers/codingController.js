import asyncHandler from "express-async-handler";
import CodingQuestion from "../models/codingQuestionModel.js";

// CREATE QUESTION
export const createCodingQuestion = asyncHandler(async (req, res) => {
  const { examId, question, options, correctAnswer } = req.body;

  if (!examId || !question || !options || !correctAnswer) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const newQuestion = await CodingQuestion.create({
    examId,
    question,
    options,
    correctAnswer,
  });

  res.status(201).json({
    success: true,
    data: newQuestion,
  });
});

// GET QUESTIONS
export const getQuestionsByExamId = asyncHandler(async (req, res) => {
  const { examId } = req.params;

  const questions = await CodingQuestion.find({ examId });

  res.status(200).json({
    success: true,
    data: questions || [],
  });
});