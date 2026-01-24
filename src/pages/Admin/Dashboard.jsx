import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

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
    <div className="fade-in">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, Admin
        </h1>
        <p className="text-slate-500 mt-1">
          Here’s what’s happening at CampusHub today
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Users" value={users} />
        <StatCard title="Active Notices" value={notices} />
        <StatCard title="Courses Offered" value={courses} />
      </div>

      {/* LIST SECTIONS */}
      <div className="grid grid-cols-3 gap-6">
        <ListCard title="Recent Enquiries">
          {recentEnquiries.length === 0 ? (
            <p className="text-sm text-gray-500">No enquiries</p>
          ) : (
            recentEnquiries.map((e, i) => (
              <div key={i} className="list-item">
                <p className="font-medium">{e.name}</p>
                <p className="text-xs text-slate-500">
                  {e.course_interest} • {e.email}
                </p>
              </div>
            ))
          )}
        </ListCard>

        <ListCard title="Latest Notices">
          {recentNotices.length === 0 ? (
            <p className="text-sm text-gray-500">No notices</p>
          ) : (
            recentNotices.map((n, i) => (
              <div key={i} className="list-item">
                <p className="font-medium">{n.title}</p>
                <span className="text-xs text-slate-500 capitalize">
                  {n.category}
                </span>
              </div>
            ))
          )}
        </ListCard>

        <ListCard title="Recently Added Courses">
          {recentCourses.length === 0 ? (
            <p className="text-sm text-gray-500">No courses</p>
          ) : (
            recentCourses.map((c, i) => (
              <div key={i} className="list-item">
                <p className="font-medium">{c.name}</p>
                <span className="text-xs text-slate-500">
                  {c.level}
                </span>
              </div>
            ))
          )}
        </ListCard>
      </div>
    </div>
  );
}

/* === COMPONENTS === */

function StatCard({ title, value }) {
  return (
    <div className="card text-center">
      <p className="text-sm text-slate-500 mb-1">{title}</p>
      <p className="text-4xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ListCard({ title, children }) {
  return (
    <div className="card">
      <h3 className="section-title">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
