import asyncHandler from "express-async-handler";
import ExamLog from "../models/examLogModel.js";

// ================= CREATE LOG =================
export const createExamLog = asyncHandler(async (req, res) => {
  const { examName, studentName, violationTypes } = req.body;

  if (!examName || !studentName) {
    res.status(400);
    throw new Error("Exam name and student name are required");
  }

  const log = await ExamLog.create({
    examName,
    studentName,
    violationCount: violationTypes?.length || 0,
    violationTypes: violationTypes || [],
  });

  res.status(201).json(log);
});

// ================= GET ALL LOGS =================
export const getExamLogs = asyncHandler(async (req, res) => {
  const logs = await ExamLog.find().sort({ createdAt: -1 });

  res.json(logs);
});