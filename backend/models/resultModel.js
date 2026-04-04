import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },

    // ✅ FIX: MUST BE ARRAY (NOT OBJECT)
    answers: {
      type: [Number],
      default: [],
    },

    // ✅ FIX: STORE FULL QUESTION SNAPSHOT
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number,
      },
    ],
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);
export default Result;