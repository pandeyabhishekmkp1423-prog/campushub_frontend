import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageNotices() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchNotices = async () => {
    const res = await api.get("/notices");
    setNotices(res.data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/notices", {
        title,
        description,
        category,
      });

      setTitle("");
      setDescription("");
      setCategory("general");
      setMessage("Notice added successfully");

      fetchNotices(); // 🔥 IMPORTANT
    } catch (err) {
      setMessage("Failed to add notice");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/notices/${id}`);
    fetchNotices();
  };

  return (
    <div className="p-8 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Manage Notices</h2>

      <form onSubmit={handleAdd} className="space-y-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="general">General</option>
          <option value="examination">Examination</option>
          <option value="admission">Admission</option>
        </select>

        <button
          disabled={loading}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Adding..." : "Add Notice"}
        </button>

        {message && <p className="text-sm">{message}</p>}
      </form>

      <h3 className="font-semibold mb-2">Existing Notices</h3>
      {notices.map((n) => (
        <div key={n.id} className="border p-3 mb-2 rounded">
          <p className="font-medium">{n.title}</p>
          <p className="text-sm text-gray-600">{n.description}</p>
          <p className="text-xs text-gray-400">{n.category}</p>

          <button
            onClick={() => handleDelete(n.id)}
            className="text-red-600 text-sm mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
