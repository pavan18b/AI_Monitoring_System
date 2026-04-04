import express from "express";
import {
  createExamLog,
  getExamLogs,
} from "../controllers/examLogController.js";

const router = express.Router();

// ✅ DEBUG ROUTE HIT
router.get("/", (req, res, next) => {
  console.log("🔥 /api/exam-logs HIT");
  next();
}, getExamLogs);

// ✅ CREATE LOG
router.post("/", createExamLog);

export default router;