import React, { useEffect, useState } from "react";
import axios from "../../axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import glassCard from "../../styles/glassCard";

const SamplePage = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const isStudent = userInfo?.role === "student";

  // FETCH EXAMS
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("/exams");
        setExams(res.data);
      } catch (err) {
        console.error("Error fetching exams:", err);
      }
    };

    fetchExams();
  }, []);

  return (
    <Box p={3}>
      {/* HEADER */}
      <Typography variant="h4" mb={2} color="#fff">
  Dashboard
</Typography>

      <Grid container spacing={2}>
        {exams.length === 0 ? (
          <Typography color="text.secondary">
            No exams available
          </Typography>
        ) : (
          exams.map((exam) => (
            <Grid item xs={12} sm={6} md={4} key={exam._id}>
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
                      onClick={() =>
                           navigate(
                            userInfo?.role === "student"
                               ? `/test/${exam._id}`
                               : `/admin/exam/${exam._id}`
  )
}
                    >
                      {isStudent ? "Start Exam" : "View Exam"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default SamplePage;