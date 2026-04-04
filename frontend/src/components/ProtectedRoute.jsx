import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // 🔥 fallback check (VERY IMPORTANT)
  const storedUser = localStorage.getItem('userInfo');

  const isAuthenticated = userInfo || storedUser;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;