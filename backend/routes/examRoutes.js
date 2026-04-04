import express from "express";
import {
  createExam,
  getExams,
  getExamById,
  deleteExamById,
  publishExam,
} from "../controllers/examController.js";

import {
  createQuestion,
  getQuestionsByExamId,
} from "../controllers/quesController.js";

const router = express.Router();

// 🔥 IMPORTANT ORDER (questions first)
router.route("/questions").post(createQuestion);
router.route("/questions/:examId").get(getQuestionsByExamId);

// EXAMS
router.route("/").post(createExam).get(getExams);

router.route("/publish/:id").put(publishExam);

router
  .route("/:id")
  .get(getExamById)
  .delete(deleteExamById);

export default router;