import React from "react";
import { Stack } from "@mui/material";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";

const ExamForm = ({ formik }) => {
  const { values, handleChange } = formik;

  return (
    <>
      <Stack mb={2}>
        <CustomTextField
          name="examName"
          label="Exam Name"
          value={values.examName}
          onChange={handleChange}
          fullWidth
        />
      </Stack>

      <Stack mb={2}>
        <CustomTextField
          name="totalQuestions"
          label="Total Questions"
          value={values.totalQuestions}
          onChange={handleChange}
          fullWidth
        />
      </Stack>

      <Stack mb={2}>
        <CustomTextField
          name="duration"
          label="Duration (minutes)"
          value={values.duration}
          onChange={handleChange}
          fullWidth
        />
      </Stack>

      <Stack mb={2}>
        <CustomTextField
          name="scheduledDate"
          type="datetime-local"
          label="Scheduled Date & Time"
          value={values.scheduledDate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Stack>
    </>
  );
};

export default ExamForm;