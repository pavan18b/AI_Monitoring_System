import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import axios from "../../axios";
import { useSelector } from "react-redux";
import glassCard from "../../styles/glassCard";

// 🌟 OVERLAY
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backdropFilter: "blur(12px)",
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  zIndex: 9999,
  color: "#fff",
};

const TestPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const isStudent = userInfo?.role === "student";

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  const [violations, setViolations] = useState(0);
  const [showExitOverlay, setShowExitOverlay] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showSubmitPrompt, setShowSubmitPrompt] = useState(false);

  // ================= FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      const qRes = await axios.get(`/exams/questions/${examId}`);
      const eRes = await axios.get(`/exams/${examId}`);

      setQuestions(qRes.data);
      setExam(eRes.data);
      setTimeLeft(eRes.data.duration * 60);
    };
    fetchData();
  }, [examId]);

  // ================= TIMER =================
  useEffect(() => {
    if (!started || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit("Test Ended");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, submitted]);

  // ================= FULLSCREEN =================
  const enterFullScreen = async () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      try {
        await el.requestFullscreen();
      } catch {}
    }
  };

  const handleStart = async () => {
    await enterFullScreen();
    setStarted(true);
  };

  const handleReturnFullscreen = async () => {
    await enterFullScreen();
    setShowExitOverlay(false);
  };

  // ================= FULLSCREEN EXIT =================
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement && started && !submitted) {
        setShowExitOverlay(true);
        setCountdown(5);
      }
    };

    document.addEventListener("fullscreenchange", handler);
    return () =>
      document.removeEventListener("fullscreenchange", handler);
  }, [started, submitted]);

  // ================= COUNTDOWN =================
  useEffect(() => {
    if (!showExitOverlay) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [showExitOverlay]);

  // ================= TAB SWITCH =================
  useEffect(() => {
    const handler = () => {
      if (document.hidden && started && !submitted) {
        setShowSubmitPrompt(true);
      }
    };

    document.addEventListener("visibilitychange", handler);
    return () =>
      document.removeEventListener("visibilitychange", handler);
  }, [started, submitted]);

  // ================= SUBMIT =================
  const handleSubmit = async (msg = "Submitted") => {
    try {
      if (!questions.length) return;

      await axios.post("/results", {
        exam: examId,
        answers,
      });
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
    }

    setSubmitted(msg);
  };

  const handleCancelSubmit = async () => {
    const newViolation = violations + 1;
    setViolations(newViolation);
    setShowSubmitPrompt(false);

    if (newViolation >= 2) {
      handleSubmit("Test ended with violations");
    } else {
      await enterFullScreen();
    }
  };

  // ================= RESULT =================
  if (submitted) {
    return (
      <Box sx={overlayStyle}>
        <Typography variant="h3">{submitted}</Typography>
        <Button onClick={() => navigate("/dashboard")} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  // ================= ADMIN =================
  if (!isStudent) {
    return (
      <Box p={3}>
        <Typography variant="h4">{exam?.examName}</Typography>

        {questions.map((q, i) => (
          <Card key={i} sx={{ ...glassCard, mb: 2 }}>
            <Typography>
              {i + 1}. {q.question}
            </Typography>

            {q.options?.map((opt, idx) => (
              <Typography key={idx}>
                {String.fromCharCode(65 + idx)}) {opt}
                {idx === q.correctAnswer && " ✅"}
              </Typography>
            ))}
          </Card>
        ))}
      </Box>
    );
  }

  // ================= INSTRUCTIONS =================
  if (!started) {
    return (
      <Box p={4}>
        <Typography variant="h4">{exam?.examName}</Typography>

        <Box mt={2}>
          <Typography>• Stay in fullscreen</Typography>
          <Typography>• Do not switch tabs</Typography>
          <Typography>• Violations lead to auto submit</Typography>
        </Box>

        <Button variant="contained" onClick={handleStart} sx={{ mt: 3 }}>
          Begin Test
        </Button>
      </Box>
    );
  }

  const q = questions[currentIndex];

  // ================= MAIN =================
  return (
    <Box p={3}>
      <Typography textAlign="right">
        ⏱ {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </Typography>

      <Card sx={{ ...glassCard }}>
        <Typography variant="h5">
          {currentIndex + 1}. {q?.question}
        </Typography>

        <RadioGroup
          value={answers[currentIndex] ?? ""}
          onChange={(e) => {
            const updated = [...answers];
            updated[currentIndex] = Number(e.target.value);
            setAnswers(updated);
          }}
        >
          {q?.options?.map((opt, i) => (
            <FormControlLabel
              key={i}
              value={i}
              control={<Radio />}
              label={`${String.fromCharCode(65 + i)}) ${opt}`}
            />
          ))}
        </RadioGroup>
      </Card>

      <Box mt={3} display="flex" justifyContent="space-between">
        <Button onClick={() => setCurrentIndex((p) => Math.max(p - 1, 0))}>
          Prev
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button onClick={() => handleSubmit("Submitted")}>
            Submit
          </Button>
        ) : (
          <Button onClick={() => setCurrentIndex((p) => p + 1)}>
            Save & Next
          </Button>
        )}
      </Box>

      {/* EXIT FULLSCREEN */}
      {showExitOverlay && (
        <Box sx={overlayStyle}>
          {countdown > 0 ? (
            <>
              <Typography variant="h4">⚠ Do not try to cheat</Typography>
              <Typography variant="h1">{countdown}</Typography>
            </>
          ) : (
            <Button onClick={handleReturnFullscreen}>
              Go Back to Exam
            </Button>
          )}
        </Box>
      )}

      {/* TAB SWITCH */}
      {showSubmitPrompt && (
        <Box sx={overlayStyle}>
          <Typography variant="h5">
            ⚠ Violation {violations + 1} / 2
          </Typography>

          <Typography>Do you want to submit?</Typography>

          <Box mt={2} display="flex" gap={2}>
            <Button onClick={() => handleSubmit("Test Ended")} color="error">
              Yes
            </Button>

            <Button onClick={handleCancelSubmit} color="success">
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TestPage;