import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import glassCard from "../../styles/glassCard";

const AddQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const examId = new URLSearchParams(location.search).get("examId");

  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState(null);

  const [form, setForm] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  // FETCH EXAM
  const fetchExam = async () => {
    try {
      const res = await axios.get(`/exams/${examId}`);
      setExam(res.data);
    } catch (err) {
      console.error("EXAM FETCH ERROR:", err);
    }
  };

  // FETCH QUESTIONS
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`/exams/questions/${examId}`);
      setQuestions(res.data);
    } catch (err) {
      console.error("QUESTION FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    if (examId) {
      fetchExam();
      fetchQuestions();
    }
  }, [examId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE QUESTION
  const handleSaveQuestion = async () => {
    if (
      !form.question ||
      !form.optionA ||
      !form.optionB ||
      !form.optionC ||
      !form.optionD ||
      form.correctAnswer === ""
    ) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await axios.post("/exams/questions", {
        examId,
        question: form.question,
        options: [
          form.optionA,
          form.optionB,
          form.optionC,
          form.optionD,
        ],
        correctAnswer: Number(form.correctAnswer),
      });

      toast.success("Question Added");

      setForm({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
      });

      fetchQuestions();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error");
    }
  };

  // PUBLISH
  const handlePublish = async () => {
    try {
      await axios.put(`/exams/publish/${examId}`);
      toast.success("Exam Published");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Publish failed");
    }
  };

  const isLimitReached =
    exam && questions.length >= exam.totalQuestions;

  return (
    <Box p={3}>
      <Typography variant="h4" color="#fff">
        Add Questions
      </Typography>

      <Typography color="#94a3b8">
        Questions: {questions.length} / {exam?.totalQuestions || 0}
      </Typography>

      {!isLimitReached && (
        <Card sx={{ ...glassCard, mt: 2 }}>
          <CardContent>
            {/* QUESTION */}
            <TextField
              fullWidth
              label="Question"
              name="question"
              value={form.question}
              onChange={handleChange}
              sx={inputStyle}
            />

            {/* OPTIONS */}
            <TextField fullWidth label="Option A" name="optionA" value={form.optionA} onChange={handleChange} sx={inputStyle} />
            <TextField fullWidth label="Option B" name="optionB" value={form.optionB} onChange={handleChange} sx={inputStyle} />
            <TextField fullWidth label="Option C" name="optionC" value={form.optionC} onChange={handleChange} sx={inputStyle} />
            <TextField fullWidth label="Option D" name="optionD" value={form.optionD} onChange={handleChange} sx={inputStyle} />

            {/* CORRECT ANSWER */}
            <TextField
              select
              fullWidth
              label="Correct Answer"
              name="correctAnswer"
              value={form.correctAnswer}
              onChange={handleChange}
              sx={inputStyle}
            >
              <MenuItem value={0}>A</MenuItem>
              <MenuItem value={1}>B</MenuItem>
              <MenuItem value={2}>C</MenuItem>
              <MenuItem value={3}>D</MenuItem>
            </TextField>
          </CardContent>
        </Card>
      )}

      <Box mt={2}>
        <Button
          fullWidth
          variant="contained"
          onClick={isLimitReached ? handlePublish : handleSaveQuestion}
          sx={{
            borderRadius: "30px",
            background: "linear-gradient(135deg,#00c6ff,#0072ff)",
            fontWeight: "bold",
          }}
        >
          {isLimitReached ? "Publish Exam" : "Save Question"}
        </Button>
      </Box>
    </Box>
  );
};

// ✅ FINAL INPUT STYLE FIX
const inputStyle = {
  mb: 2,

  "& .MuiInputBase-input": {
    color: "#fff", // text
  },

  "& .MuiInputLabel-root": {
    color: "#94a3b8", // label
  },

  "& .MuiSvgIcon-root": {
    color: "#fff", // dropdown arrow
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.2)",
    },
    "&:hover fieldset": {
      borderColor: "#38bdf8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366f1",
    },
  },
};

export default AddQuestions;