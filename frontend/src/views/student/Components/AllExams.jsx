import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Box, Typography, Card, CardContent } from "@mui/material";

const AllExams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("/exams");
        setExams(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExams();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4">All Exams</Typography>

      {exams.length === 0 ? (
        <Typography>No exams available</Typography>
      ) : (
        exams.map((exam) => (
          <Card key={exam._id} sx={{ mt: 2 }}>
            <CardContent>
              <Typography>{exam.title}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default AllExams;