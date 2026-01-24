import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "general",
  });

  const loadNotices = async () => {
    try {
      const res = await api.get("/admin/notices");
      setNotices(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load notices");
      console.error(err);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/notices", form);
      setForm({
        title: "",
        description: "",
        category: "general",
      });
      loadNotices();
    } catch (err) {
      alert("Failed to add notice");
      console.error(err);
    }
  };

  const del = async (id) => {
    if (!confirm("Delete this notice?")) return;
    await api.delete(`/admin/notices/${id}`);
    loadNotices();
  };

  return (
    <div className="p-8 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Manage Notices</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={submit} className="space-y-3 mb-6">
        <input
          required
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          required
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="general">General</option>
          <option value="examination">Examination</option>
          <option value="admission">Admission</option>
        </select>

        <button className="bg-teal-600 text-white px-4 py-2 rounded">
          Add Notice
        </button>
      </form>

      <h3 className="font-semibold mb-2">Existing Notices</h3>

      {notices.map((n) => (
        <div key={n.id} className="border p-3 mb-2 rounded">
          <p className="font-medium">{n.title}</p>
          <p className="text-sm text-gray-600">{n.description}</p>
          <p className="text-xs text-gray-400 capitalize">{n.category}</p>

          <button
            onClick={() => del(n.id)}
            className="text-red-600 text-sm mt-2"
          >
            Delete
          </button>
        </div>
      ))}

      {notices.length === 0 && (
        <p className="text-gray-500">No notices found</p>
      )}
    </div>
  );
}
