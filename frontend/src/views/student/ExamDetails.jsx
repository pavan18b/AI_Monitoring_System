import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DescriptionAndInstructions = () => {
  const navigate = useNavigate();
  const { examId } = useParams();

  const [certify, setCertify] = useState(false);

  const handleTest = () => {
    if (!certify) {
      toast.error("Please accept instructions");
      return;
    }

    navigate(`/exam/${examId}/start`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" mb={2}>
          Exam Instructions
        </Typography>

        <Typography>
          Read all instructions carefully before starting the exam.
        </Typography>

        <Stack mt={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={certify}
                onChange={() => setCertify(!certify)}
              />
            }
            label="I agree to the instructions"
          />
        </Stack>

        <Button
          variant="contained"
          disabled={!certify}
          onClick={handleTest}
          sx={{ mt: 2 }}
        >
          Start Exam
        </Button>
      </CardContent>
    </Card>
  );
};

const imgUrl =
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713';

export default function ExamDetails() {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'cover',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper}>
        <DescriptionAndInstructions />
      </Grid>
    </Grid>
  );
}