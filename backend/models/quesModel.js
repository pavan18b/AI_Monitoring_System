import mongoose from "mongoose";

const quesSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    options: {
      type: [String], // ✅ IMPORTANT
      required: true,
    },

    correctAnswer: {
      type: Number, // ✅ MUST BE NUMBER (0-3)
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", quesSchema);

export default Question;