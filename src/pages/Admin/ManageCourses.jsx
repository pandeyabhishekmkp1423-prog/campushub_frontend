import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    level: "Undergraduate",
    duration: "",
    description: "",
  });

  /* =========================
     LOAD COURSES
  ========================= */
  const loadCourses = async () => {
    try {
      const res = await api.get("/admin/courses");
      setCourses(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load courses");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  /* =========================
     ADD COURSE
  ========================= */
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      console.error(err);
      alert("Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE COURSE
  ========================= */
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await api.delete(`/admin/courses/${id}`);
      loadCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  return (
    <div className="p-8 max-w-5xl">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Manage Courses
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Add, view, and manage academic programs offered by the university
        </p>
      </div>

      {/* ADD COURSE CARD */}
      <form
        onSubmit={submit}
        className="bg-white rounded-xl shadow-lg p-6 mb-10"
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Add New Course
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            required
            placeholder="Course name"
            className="border border-slate-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <select
            className="border border-slate-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={form.level}
            onChange={(e) =>
              setForm({ ...form, level: e.target.value })
            }
          >
            <option>Diploma</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
          </select>

          <input
            placeholder="Duration (e.g. 3 Years)"
            className="border border-slate-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: e.target.value })
            }
          />

          <textarea
            placeholder="Course description"
            className="border border-slate-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-teal-500
                       md:col-span-2 h-28 resize-none"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <button
          disabled={loading}
          className="mt-6 px-6 py-3 rounded-lg bg-teal-600 text-white
                     font-semibold shadow-md hover:bg-teal-700 transition
                     disabled:opacity-60"
        >
          {loading ? "Adding Course..." : "Add Course"}
        </button>
      </form>

      {/* ERROR */}
      {error && (
        <p className="text-red-600 mb-4 text-sm">{error}</p>
      )}

      {/* COURSE LIST */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Existing Courses
        </h3>

        {courses.length === 0 ? (
          <p className="text-sm text-slate-500">
            No courses added yet
          </p>
        ) : (
          <div className="space-y-4">
            {courses.map((c) => (
              <div
                key={c.id}
                className="bg-white border rounded-lg p-4 flex
                           items-center justify-between shadow-sm
                           hover:shadow-md transition"
              >
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {c.name}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {c.level} · {c.duration || "Duration not specified"}
                  </p>
                </div>

                <button
                  onClick={() => del(c.id)}
                  className="text-sm text-red-600 hover:text-red-700
                             font-semibold"
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
