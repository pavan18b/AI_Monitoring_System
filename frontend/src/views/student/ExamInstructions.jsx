import React from "react";
import { Box, Typography, Button, Card } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ExamInstructions = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card sx={{ p: 4, width: 500 }}>
        <Typography variant="h4" mb={2}>
          Exam Instructions
        </Typography>

        <Typography>• Do not switch tabs</Typography>
        <Typography>• Camera must be ON</Typography>
        <Typography>• Stay in fullscreen mode</Typography>
        <Typography>• 2 violations → disqualified</Typography>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          fullWidth
          onClick={() => navigate(`/exam/${examId}`)}
        >
          Start Exam
        </Button>
      </Card>
    </Box>
  );
};

export default ExamInstructions;