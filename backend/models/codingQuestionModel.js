import mongoose from "mongoose";

const codingQuestionSchema = mongoose.Schema(
  {
    // 🔗 Link to Exam
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    // 📝 Question
    question: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔘 Options (MCQ)
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (val) {
          return val.length >= 2; // at least 2 options
        },
        message: "At least 2 options are required",
      },
    },

    // ✅ Correct Answer
    correctAnswer: {
      type: String,
      required: true,
    },

    // 📊 Optional: Marks per question
    marks: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const CodingQuestion = mongoose.model(
  "CodingQuestion",
  codingQuestionSchema
);

export default CodingQuestion;