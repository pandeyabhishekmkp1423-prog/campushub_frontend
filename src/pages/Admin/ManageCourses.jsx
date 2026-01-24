import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    level: "Undergraduate",
    duration: "",
    description: "",
  });

  const loadCourses = async () => {
    try {
      const res = await api.get("/admin/courses");
      setCourses(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load courses");
      console.error(err);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/courses", form);
      setForm({
        name: "",
        level: "Undergraduate",
        duration: "",
        description: "",
      });
      loadCourses();
    } catch (err) {
      alert("Failed to add course");
      console.error(err);
    }
  };

  const del = async (id) => {
    if (!confirm("Delete this course?")) return;
    await api.delete(`/admin/courses/${id}`);
    loadCourses();
  };

  return (
    <div className="p-8 max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={submit} className="grid grid-cols-2 gap-4 mb-8">
        <input
          required
          placeholder="Course name"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="border p-2"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
        >
          <option>Diploma</option>
          <option>Undergraduate</option>
          <option>Postgraduate</option>
        </select>

        <input
          placeholder="Duration"
          className="border p-2"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border p-2 col-span-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="bg-teal-600 text-white py-2 col-span-2 rounded">
          Add Course
        </button>
      </form>

      {courses.map((c) => (
        <div key={c.id} className="border p-4 mb-3 flex justify-between">
          <div>
            <h3 className="font-semibold">{c.name}</h3>
            <p className="text-sm text-gray-600">
              {c.level} · {c.duration || "—"}
            </p>
          </div>
          <button onClick={() => del(c.id)} className="text-red-600">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
