import React, { useEffect, useState } from "react";
import axios from "../../axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import glassCard from "../../styles/glassCard"; // ✅ IMPORTANT

const ExamPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const isStudent = userInfo?.role === "student";

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("/exams");
        setExams(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Exams
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : exams.length === 0 ? (
        <Typography color="text.secondary">
          No exams available
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {exams.map((exam) => (
            <Grid item xs={12} md={4} key={exam._id}>
              <Card
                sx={{
                  ...glassCard,
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardContent>
                  {/* TITLE */}
                  <Typography variant="h6">
                    {exam.examName}
                  </Typography>

                  {/* DETAILS */}
                  <Typography sx={{ mt: 1 }}>
                    🕒 Duration: {exam.duration} mins
                  </Typography>

                  <Typography variant="body2">
                    📅{" "}
                    {new Date(
                      exam.scheduledDate
                    ).toLocaleDateString()}
                  </Typography>

                  {/* BUTTON */}
                  <Box mt={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        borderRadius: "25px",
                        background:
                          "linear-gradient(135deg,#38bdf8,#6366f1)",
                        textTransform: "none",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        if (isStudent) {
                          navigate(`/exam/${exam._id}`);
                        } else {
                          navigate(`/admin/exam/${exam._id}`);
                        }
                      }}
                    >
                      {isStudent
                        ? "Start Exam"
                        : "View Exam"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ExamPage;