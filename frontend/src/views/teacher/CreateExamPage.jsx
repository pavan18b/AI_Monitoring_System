import React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import ExamForm from "./components/ExamForm";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import glassCard from "../../styles/glassCard";

const schema = yup.object({
  examName: yup.string().required("Exam name is required"),
  totalQuestions: yup.number().required(),
  duration: yup.number().required(),
  scheduledDate: yup.date().required(),
});

const CreateExamPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      examName: "",
      totalQuestions: "",
      duration: "",
      scheduledDate: "",
    },
    validationSchema: schema,

    onSubmit: async (values) => {
      console.log("SUBMIT TRIGGERED");

      try {
        const res = await axios.post("/exams", {
          examName: values.examName,
          totalQuestions: Number(values.totalQuestions),
          duration: Number(values.duration),
          scheduledDate: values.scheduledDate,
        });

        toast.success("Exam Created");

        navigate(`/add-questions?examId=${res.data._id}`);
      } catch (err) {
        console.error(err);
        toast.error("Failed");
      }
    },
  });

  return (
    <Box p={3}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ ...glassCard }}>
            <CardContent>
              <Typography variant="h5" mb={2}>
                Create Exam
              </Typography>

              <form onSubmit={formik.handleSubmit}>
                <ExamForm formik={formik} />

                <Box mt={3}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                  >
                    Create Exam
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateExamPage;