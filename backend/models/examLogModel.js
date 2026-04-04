import mongoose from "mongoose";

const examLogSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    violationCount: {
      type: Number,
      default: 0,
    },

    violationTypes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const ExamLog = mongoose.model("ExamLog", examLogSchema);

export default ExamLog;