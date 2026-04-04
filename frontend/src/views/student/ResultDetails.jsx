import React from "react";
import { Box, Typography, Card } from "@mui/material";
import glassCard from "../../styles/glassCard";

const ResultDetails = ({ result }) => {
  // ✅ SAFETY CHECK
  if (!result || !result.questions || !result.answers) {
    return (
      <Typography color="#94a3b8">
        No detailed data available
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h5" mb={3} color="#fff">
        Detailed Report
      </Typography>

      {result.questions.map((q, i) => {
        const userAnswer = result.answers[i];
        const correct = q.correctAnswer;

        return (
          <Card
            key={i}
            sx={{
              ...glassCard,
              p: 2,
              mb: 2,
            }}
          >
            {/* QUESTION */}
            <Typography color="#fff" mb={1}>
              {i + 1}. {q.question}
            </Typography>

            {/* OPTIONS */}
            {q.options?.map((opt, idx) => {
              let color = "#fff";
              let suffix = "";

              if (idx === correct) {
                color = "#22c55e";
                suffix = " ✅ correct";
              }

              if (idx === userAnswer && userAnswer !== correct) {
                color = "#ef4444";
                suffix = " ❌ wrong";
              }

              return (
                <Typography key={idx} sx={{ ml: 2, color }}>
                  {String.fromCharCode(65 + idx)}) {opt} {suffix}
                </Typography>
              );
            })}
          </Card>
        );
      })}
    </Box>
  );
};

export default ResultDetails;