import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLayout from "./components/AdminLayout";

// Public pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Enquiry from "./pages/Enquiry";

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import ManageNotices from "./pages/Admin/ManageNotices";
import ManageGallery from "./pages/Admin/ManageGallery";
import ManageCourses from "./pages/Admin/ManageCourses";
import RegisteredUsers from "./pages/Admin/RegisteredUsers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/enquiry" element={<Enquiry />} />

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ================= ADMIN PANEL ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="notices" element={<ManageNotices />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="users" element={<RegisteredUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
