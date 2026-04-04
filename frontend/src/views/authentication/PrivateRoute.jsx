import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCredentials } from "../../slices/authSlice";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const storedUser = localStorage.getItem("userInfo");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  // 🔥 RESTORE REDUX FROM LOCALSTORAGE
  useEffect(() => {
    if (!userInfo && parsedUser?.token) {
      dispatch(setCredentials(parsedUser));
    }
  }, [userInfo, parsedUser, dispatch]);

  // 🔥 FINAL CHECK
  if (!userInfo && !parsedUser?.token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;