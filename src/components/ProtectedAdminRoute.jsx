import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("adminRole");

  // 🔒 STRICT CHECK
  if (!token || role !== "admin") {
    // clean invalid state
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
