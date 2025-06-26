// components/AuthGuard.tsx
import { Navigate, Outlet  } from "react-router-dom";

const AuthGuard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthGuard;
