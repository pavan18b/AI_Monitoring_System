import express from "express";
import {
  createCodingQuestion,
  getQuestionsByExamId,
} from "../controllers/codingController.js";

const router = express.Router();

// ✅ CREATE QUESTION
router.post("/", createCodingQuestion);

// ✅ GET QUESTIONS
router.get("/exam/:examId", getQuestionsByExamId);

export default router;