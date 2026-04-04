import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const NumberOfQuestions = ({
  questionLength,
  submitTest,
  examDurationInSeconds,
}) => {
  const [timeLeft, setTimeLeft] = useState(examDurationInSeconds);

  useEffect(() => {
    setTimeLeft(examDurationInSeconds);
  }, [examDurationInSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.warning('Time up!');
          submitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <Box>
      <Typography>Questions: {questionLength}</Typography>
      <Typography>Time: {format(timeLeft)}</Typography>

      <Button onClick={submitTest} color="error">
        Finish
      </Button>
    </Box>
  );
};

export default NumberOfQuestions;