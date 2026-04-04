import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../views/authentication/PrivateRoute";
import FullLayout from "../layouts/full/FullLayout";

// Auth
import Login from "../views/authentication/Login";
import Register from "../views/authentication/Register";

// Common
import SamplePage from "../views/sample-page/SamplePage";

// Teacher
import CreateExamPage from "../views/teacher/CreateExamPage";
import AddQuestions from "../views/teacher/AddQuestions";
import ExamLogPage from "../views/teacher/ExamLogPage";

// Student/Admin
import ExamPage from "../views/student/ExamPage";
import TestPage from "../views/student/TestPage";
import StudentResultPage from "../views/student/ResultPage";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        element: <FullLayout />,
        children: [
          // DASHBOARD
          { path: "/dashboard", element: <SamplePage /> },

          // ================= TEACHER =================
          { path: "/create-exam", element: <CreateExamPage /> },
          { path: "/add-questions", element: <AddQuestions /> },

          // ✅ EXAM LOG (ADMIN/TEACHER ONLY UI CONTROLLED VIA SIDEBAR)
          { path: "/exam-logs", element: <ExamLogPage /> },

          // ================= EXAMS =================
          { path: "/exam", element: <ExamPage /> },

          // ✅ STUDENT TEST
          { path: "/test/:examId", element: <TestPage /> },

          // ✅ ADMIN VIEW EXAM
          { path: "/admin/exam/:examId", element: <TestPage /> },

          // ================= RESULTS =================
          { path: "/result", element: <StudentResultPage /> },
        ],
      },
    ],
  },

  // DEFAULT ROUTES
  { path: "/", element: <Login /> },
  { path: "*", element: <h1>404 Page Not Found</h1> },
]);

export default router;