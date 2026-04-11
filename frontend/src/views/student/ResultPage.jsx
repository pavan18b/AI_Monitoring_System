import React, { useEffect, useState } from "react";
import axios from "../../axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import ResultDetails from "./ResultDetails";
import glassCard from "../../styles/glassCard";

const ResultPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo?.role !== "student";

  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const url = isAdmin ? "/results/all" : "/results/my";
      const res = await axios.get(url);
      setResults(res.data || []);
    } catch (err) {
      console.error("FETCH RESULTS ERROR:", err);
    }
  };

  const handleExamClick = async (examId) => {
    if (!examId) return;

    try {
      // STUDENT FLOW
      if (!isAdmin) {
        const selectedResult = results.find(
          (r) => r.exam?._id === examId
        );
        setSelected(selectedResult);
        return;
      }

      // ADMIN FLOW → GET STUDENTS
      const res = await axios.get(`/results/exam/${examId}`);
      setStudents(res.data || []);
      setSelected(null);
    } catch (err) {
      console.error("EXAM CLICK ERROR:", err);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} color="#fff">
        Results
      </Typography>

      {/* ================= RESULT CARDS ================= */}
      <Grid container spacing={2}>
        {results.length === 0 ? (
          <Typography color="#94a3b8">
            No results available
          </Typography>
        ) : (
          results.map((r, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card
                sx={{
                  ...glassCard,
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.03)" },
                }}
                onClick={() => handleExamClick(r.exam?._id)}
              >
                <CardContent>
                  <Typography variant="h6" color="#fff">
                    {r.exam?.examName || "Exam"}
                  </Typography>

                  {/* ✅ SHOW MARKS FOR BOTH */}
                  <Typography sx={{ mt: 1, color: "#cbd5e1" }}>
                    {r.score} / {r.total}
                  </Typography>

                  <Typography variant="body2" color="#94a3b8">
                    {r.createdAt
                      ? new Date(r.createdAt).toLocaleString()
                      : ""}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* ================= ADMIN → STUDENTS ================= */}
      {isAdmin && students.length > 0 && (
        <Box mt={5}>
          <Typography variant="h5" mb={2} color="#fff">
            Students Attempted
          </Typography>

          <Grid container spacing={2}>
            {students.map((s, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card
                  sx={{
                    ...glassCard,
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                  onClick={() => setSelected(s)}
                >
                  <CardContent>
                    <Typography variant="h6" color="#fff">
                      {s.user?.name}
                    </Typography>

                    <Typography sx={{ mt: 1, color: "#cbd5e1" }}>
                      {s.score} / {s.total}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* ================= DETAILS ================= */}
      {selected && (
        <Box mt={5}>
          <ResultDetails result={selected} />
        </Box>
      )}
    </Box>
  );
};

export default ResultPage;