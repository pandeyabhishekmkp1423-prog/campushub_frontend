import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* ================= MOBILE SIDEBAR OVERLAY ================= */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="relative z-50 w-64 h-full bg-slate-900 text-white flex flex-col">
            <SidebarContent logout={logout} onClose={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-white flex-col">
        <SidebarContent logout={logout} />
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </button>

            <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
              Admin Dashboard
            </h1>
          </div>

          <span className="text-sm text-slate-500 hidden sm:block">
            Secure Access
          </span>
        </header>

        {/* PAGE CONTENT */}
        <section className="flex-1 p-4 sm:p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

/* ================= SIDEBAR CONTENT ================= */

function SidebarContent({ logout, onClose }) {
  return (
    <>
      {/* BRAND */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <img src={logo} alt="CampusHub" className="w-9 h-9" />
          <div>
            <h2 className="text-lg font-semibold">CampusHub</h2>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>

        {/* CLOSE BUTTON (MOBILE) */}
        {onClose && (
          <button className="lg:hidden" onClick={onClose}>
            <X />
          </button>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavItem to="/admin/dashboard" label="Dashboard" onClick={onClose} />
        <NavItem to="/admin/notices" label="Manage Notices" onClick={onClose} />
        <NavItem to="/admin/gallery" label="Manage Gallery" onClick={onClose} />
        <NavItem to="/admin/courses" label="Manage Courses" onClick={onClose} />
        <NavItem to="/admin/users" label="Registered Users" onClick={onClose} />
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
    </>
  );
}

/* ================= REUSABLE NAV ITEM ================= */

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
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
