import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExamCard = ({ exam }) => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div>
      <h3>{exam.examName}</h3>

      <Button
        variant="contained"
        onClick={() =>
          navigate(`/test?examId=${exam._id}`)
        }
      >
        {userInfo?.role === "admin"
          ? "View Exam"
          : "Start Exam"}
      </Button>
    </div>
  );
};

export default ExamCard;