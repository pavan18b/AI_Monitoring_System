import asyncHandler from "express-async-handler";
import Exam from "../models/examModel.js";

// ✅ CREATE EXAM
export const createExam = asyncHandler(async (req, res) => {
  try {
    const { examName, totalQuestions, duration, scheduledDate } = req.body;

    console.log("BODY:", req.body);

    if (!examName || !totalQuestions || !duration || !scheduledDate) {
      res.status(400);
      throw new Error("All fields required");
    }

    const exam = await Exam.create({
      examName,
      totalQuestions: Number(totalQuestions),
      duration: Number(duration),
      scheduledDate: new Date(scheduledDate),
      isPublished: false,
    });

    res.status(201).json(exam);
  } catch (error) {
    console.error("CREATE EXAM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET EXAMS (ONLY PUBLISHED FOR STUDENT)
export const getExams = asyncHandler(async (req, res) => {
  let exams;

  // ✅ ADMIN → SEE ALL
  if (req.user && req.user.role !== "student") {
    exams = await Exam.find();
  } 
  // ✅ STUDENT → ONLY PUBLISHED
  else {
    exams = await Exam.find({ isPublished: true });
  }

  res.json(exams);
});

// ✅ GET SINGLE EXAM
export const getExamById = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    res.status(404);
    throw new Error("Exam not found");
  }

  res.json(exam);
});

// ✅ PUBLISH EXAM
export const publishExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    res.status(404);
    throw new Error("Exam not found");
  }

  exam.isPublished = true;
  await exam.save();

  res.json({ message: "Exam published" });
});

// ✅ DELETE EXAM (FIX YOUR ERROR)
export const deleteExamById = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    res.status(404);
    throw new Error("Exam not found");
  }

  await exam.deleteOne();

  res.json({ message: "Exam deleted" });
});