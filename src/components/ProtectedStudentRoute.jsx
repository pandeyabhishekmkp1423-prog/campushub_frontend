import { Navigate } from "react-router-dom";

export default function ProtectedStudentRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "student") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
