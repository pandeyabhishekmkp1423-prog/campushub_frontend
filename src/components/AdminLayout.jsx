import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        {/* BRAND */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-700">
          <img src={logo} alt="CampusHub" className="w-9 h-9" />
          <div>
            <h2 className="text-lg font-semibold">CampusHub</h2>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem to="/admin/dashboard" label="Dashboard" />
          <NavItem to="/admin/notices" label="Manage Notices" />
          <NavItem to="/admin/gallery" label="Manage Gallery" />
          <NavItem to="/admin/courses" label="Manage Courses" />
          <NavItem to="/admin/users" label="Registered Users" />
        </nav>

        {/* LOGOUT */}
        <div className="px-4 py-4 border-t border-slate-700">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800">
            Admin Dashboard
          </h1>
          <span className="text-sm text-slate-500">
            Secure Access
          </span>
        </header>

        {/* PAGE CONTENT */}
        <section className="flex-1 p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

/* ===== Reusable Nav Item ===== */
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-md transition ${
          isActive
            ? "bg-slate-700 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
