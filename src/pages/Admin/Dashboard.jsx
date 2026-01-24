import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  LogOut,
  Users,
  BookOpen,
  Bell,
} from "lucide-react";

const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const timerRef = useRef(null);

  /* =========================
     AUTO LOGOUT HANDLER
  ========================= */
  const resetTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_LIMIT);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/login");
  };

  /* =========================
     FETCH DASHBOARD
  ========================= */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
        setError("Failed to load dashboard");
      }
    };

    fetchDashboard();
  }, []);

  /* =========================
     ACTIVITY LISTENERS
  ========================= */
  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, []);

  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!stats) return <p className="p-6">Loading dashboard...</p>;

  const {
    users = 0,
    notices = 0,
    courses = 0,
    recentEnquiries = [],
    recentNotices = [],
    recentCourses = [],
  } = stats;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            CampusHub administrative overview
          </p>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2
                     bg-red-500 text-white rounded-full
                     hover:bg-red-600 transition shadow"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <StatCard
          icon={<Users />}
          title="Total Users"
          value={users}
          color="from-indigo-500 to-indigo-600"
        />
        <StatCard
          icon={<Bell />}
          title="Active Notices"
          value={notices}
          color="from-rose-500 to-rose-600"
        />
        <StatCard
          icon={<BookOpen />}
          title="Courses Offered"
          value={courses}
          color="from-teal-500 to-teal-600"
        />
      </div>

      {/* RECENT DATA */}
      <div className="grid md:grid-cols-3 gap-6">
        <ListCard title="Recent Enquiries">
          {recentEnquiries.length === 0
            ? <Empty />
            : recentEnquiries.map((e, i) => (
              <Row
                key={i}
                title={e.name}
                subtitle={`${e.course_interest} • ${e.email}`}
              />
            ))}
        </ListCard>

        <ListCard title="Latest Notices">
          {recentNotices.length === 0
            ? <Empty />
            : recentNotices.map((n, i) => (
              <Row
                key={i}
                title={n.title}
                subtitle={n.category}
              />
            ))}
        </ListCard>

        <ListCard title="Recently Added Courses">
          {recentCourses.length === 0
            ? <Empty />
            : recentCourses.map((c, i) => (
              <Row
                key={i}
                title={c.name}
                subtitle={c.level}
              />
            ))}
        </ListCard>
      </div>
    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function StatCard({ title, value, icon, color }) {
  return (
    <div
      className={`bg-gradient-to-r ${color}
                  text-white rounded-2xl p-6 shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-4xl font-extrabold mt-1">{value}</p>
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </div>
  );
}

function ListCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ title, subtitle }) {
  return (
    <div className="border-b last:border-none pb-2">
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

function Empty() {
  return (
    <p className="text-sm text-slate-400 italic">
      No data available
    </p>
  );
}
