import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-toastify";
import glassCard from "../../styles/glassCard";

const AddQuestions = () => {
  const [params] = useSearchParams();
  const examId = params.get("examId");

  const [questions, setQuestions] = useState([]);
  const [limit, setLimit] = useState(0);

  const [form, setForm] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const examRes = await axios.get(`/exams/${examId}`);
        setLimit(examRes.data.totalQuestions);

        const quesRes = await axios.get(`/exams/questions/${examId}`);
        setQuestions(quesRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (examId) fetchData();
  }, [examId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE QUESTION
  const handleAddQuestion = async () => {
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

      const res = await axios.get(`/exams/questions/${examId}`);
      setQuestions(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error");
    }
  };

  const handlePublish = async () => {
    try {
      await axios.put(`/exams/publish/${examId}`);
      toast.success("Exam Published");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const isLimitReached = questions.length >= limit;

  return (
    <Box p={3}>
      <Typography variant="h4" color="#fff" mb={2}>
        Add Questions
      </Typography>

      <Typography color="#94a3b8">
        Questions: {questions.length} / {limit}
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

      <Box mt={3}>
        <Button
          fullWidth
          variant="contained"
          onClick={isLimitReached ? handlePublish : handleAddQuestion}
          sx={{
            borderRadius: "25px",
            background: "linear-gradient(135deg,#38bdf8,#6366f1)",
            textTransform: "none",
            fontWeight: "600",
          }}
        >
          {isLimitReached ? "Publish Exam" : "Save Question"}
        </Button>
      </Box>
    </Box>
  );
};

// ✅ FINAL FIXED STYLE
const inputStyle = {
  mb: 2,

  "& .MuiInputBase-input": {
    color: "#fff", // 🔥 TEXT COLOR FIX
  },

  "& .MuiInputLabel-root": {
    color: "#94a3b8",
  },

  "& .MuiSvgIcon-root": {
    color: "#fff", // dropdown arrow
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#475569",
    },
    "&:hover fieldset": {
      borderColor: "#94a3b8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#38bdf8",
    },
  },
};

export default AddQuestions;