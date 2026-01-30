import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "general",
  });

  /* =========================
     LOAD NOTICES
  ========================= */
  const loadNotices = async () => {
    try {
      const res = await api.get("/admin/notices");
      setNotices(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  /* =========================
     EMIT DASHBOARD REFRESH
  ========================= */
  const notifyDashboard = () => {
    window.dispatchEvent(new Event("dashboard:refresh"));
  };

  /* =========================
     ADD NOTICE
  ========================= */
  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/notices", form);

      setForm({
        title: "",
        description: "",
        category: "general",
      });

      await loadNotices();
      notifyDashboard(); // 🔥 KEY LINE
    } catch (err) {
      alert("Failed to add notice");
      console.error(err);
    }
  };

  /* =========================
     DELETE NOTICE
  ========================= */
  const del = async (id) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    try {
      await api.delete(`/admin/notices/${id}`);
      await loadNotices();
      notifyDashboard(); // 🔥 KEY LINE
    } catch (err) {
      alert("Failed to delete notice");
      console.error(err);
    }
  };

  /* =========================
     STATES
  ========================= */
  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">Loading notices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Manage Notices
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Create, view, and manage important university announcements
        </p>
      </div>

      {/* ADD NOTICE FORM */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">
          Add New Notice
        </h3>

        <form onSubmit={submit} className="space-y-4">
          <input
            required
            placeholder="Notice title"
            className="w-full border rounded px-3 py-2"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            required
            placeholder="Notice description"
            rows={4}
            className="w-full border rounded px-3 py-2"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            className="w-full border rounded px-3 py-2"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="general">General Announcements</option>
            <option value="examination">Examination Updates</option>
            <option value="admission">Admissions & Academics</option>
          </select>

          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded font-medium"
          >
            Add Notice
          </button>
        </form>
      </div>

      {/* EXISTING NOTICES */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-800">
          Existing Notices
        </h3>

        {notices.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">
              No notices have been added yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-xl shadow p-5 flex justify-between"
              >
                <div>
                  <p className="font-semibold">{n.title}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {n.description}
                  </p>
                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-slate-100 capitalize">
                    {n.category}
                  </span>
                </div>

                <button
                  onClick={() => del(n.id)}
                  className="text-red-600 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
