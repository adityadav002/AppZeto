/** @format */

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { isAuth, role } = useSelector((state) => state.auth);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default AdminRoute;
