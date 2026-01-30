import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { LogOut, Users, BookOpen, Bell } from "lucide-react";

/* =========================
   SAFE FALLBACK
========================= */
const INITIAL_DASHBOARD = {
  stats: {
    totalUsers: 0,
    totalNotices: 0,
    totalCourses: 0,
  },
  recent: {
    enquiries: [],
    notices: [],
    courses: [],
  },
};

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(INITIAL_DASHBOARD);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = useCallback(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  /* =========================
     FETCH DASHBOARD (FIXED)
  ========================= */
  const fetchDashboard = useCallback(async () => {
    try {
      setError("");

      // ✅ CORRECT ENDPOINT (matches ManageEnquiries)
      const res = await api.get("/admin/dashboard");


      const data = res.data || {};

      setDashboard({
        stats: {
          totalUsers: data.stats?.totalUsers ?? 0,
          totalNotices: data.stats?.totalNotices ?? 0,
          totalCourses: data.stats?.totalCourses ?? 0,
        },
        recent: {
          enquiries: data.recent?.enquiries ?? [],
          notices: data.recent?.notices ?? [],
          courses: data.recent?.courses ?? [],
        },
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      } else {
        setError("Dashboard service unavailable");
        setDashboard(INITIAL_DASHBOARD);
      }
    } finally {
      setLoading(false);
    }
  }, [handleLogout]);

  /* =========================
     INITIAL LOAD + AUTO REFRESH
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    fetchDashboard();
    const interval = setInterval(fetchDashboard, 15000);
    return () => clearInterval(interval);
  }, [fetchDashboard, navigate]);

  /* =========================
     UI STATES
  ========================= */
  if (loading) {
    return <p className="p-6 text-slate-500">Loading dashboard…</p>;
  }

  const { stats, recent } = dashboard;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-500">CampusHub overview</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-full"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {error && (
        <div className="mb-6 text-red-600 text-sm">
          {error}
          <button
            onClick={fetchDashboard}
            className="ml-4 px-3 py-1 bg-teal-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.totalUsers} icon={<Users />} />
        <StatCard title="Active Notices" value={stats.totalNotices} icon={<Bell />} />
        <StatCard title="Courses Offered" value={stats.totalCourses} icon={<BookOpen />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ListCard title="Recent Enquiries">
          {recent.enquiries.length === 0
            ? <Empty />
            : recent.enquiries.map(e => (
                <Row key={e.id} title={e.name} subtitle={e.email} />
              ))}
        </ListCard>

        <ListCard title="Latest Notices">
          {recent.notices.length === 0
            ? <Empty />
            : recent.notices.map(n => (
                <Row key={n.id} title={n.title} subtitle={n.category} />
              ))}
        </ListCard>

        <ListCard title="Recently Added Courses">
          {recent.courses.length === 0
            ? <Empty />
            : recent.courses.map(c => (
                <Row key={c.id} title={c.name} subtitle={c.level} />
              ))}
        </ListCard>
      </div>
    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      {icon}
    </div>
  );
}

function ListCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-bold mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ title, subtitle }) {
  return (
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

function Empty() {
  return <p className="text-sm italic text-slate-400">No data available</p>;
}
