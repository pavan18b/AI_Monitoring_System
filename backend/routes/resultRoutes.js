import express from "express";
import {
  createResult,
  getMyResults,
  getAllResults,
  getResultsByExam,
} from "../controllers/resultController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createResult);
router.get("/my", protect, getMyResults);
router.get("/admin", protect, getAllResults);

// ✅ IMPORTANT
router.get("/exam/:examId", protect, getResultsByExam);

export default router;