import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const TeacherRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const storedUser = localStorage.getItem("userInfo");

  const user = userInfo || (storedUser && JSON.parse(storedUser));

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.role !== "teacher") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default TeacherRoute;