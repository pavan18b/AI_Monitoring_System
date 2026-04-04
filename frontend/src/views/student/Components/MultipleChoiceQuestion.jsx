import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function MultipleChoiceQuestion({ questions = [] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});

  if (!questions || questions.length === 0) {
    return <Typography>No questions available</Typography>;
  }

  const currentQ = questions[currentQuestion];

  const isLast = currentQuestion === questions.length - 1;

  const handleNext = () => {
    const updatedAnswers = {
      ...answers,
      [currentQ._id]: selectedOption,
    };

    setAnswers(updatedAnswers);

    // 🔥 STORE GLOBALLY
    window.studentAnswers = updatedAnswers;

    if (!isLast) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          Question {currentQuestion + 1}
        </Typography>

        <Typography mb={2}>
          {currentQ.question}
        </Typography>

        <RadioGroup
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {currentQ.options?.map((opt, i) => (
            <FormControlLabel
              key={i}
              value={opt}
              control={<Radio />}
              label={opt}
            />
          ))}
        </RadioGroup>

        {!isLast && (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            Next
          </Button>
        )}

        {isLast && (
          <Typography mt={2} color="green">
            Last question reached. Click "Finish Test".
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}