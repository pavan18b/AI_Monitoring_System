import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import CheatingTable from "./components/CheatingTable";
import glassCard from "../../styles/glassCard";

const ExamLogPage = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} color="#fff">
        Exam Logs
      </Typography>

      <Card sx={{ ...glassCard }}>
        <CardContent>
          <CheatingTable />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExamLogPage;