import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    level: "Undergraduate",
    duration: "",
    description: "",
  });

  const load = async () => {
    const res = await api.get("/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/courses", form);
    setForm({ name: "", level: "Undergraduate", duration: "", description: "" });
    load();
  };

  const del = async (id) => {
    await api.delete(`/courses/${id}`);
    load();
  };

  return (
    <div className="p-8 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Manage Courses</h2>

      <form onSubmit={submit} className="grid grid-cols-2 gap-4 mb-10">
        <input placeholder="Course name" className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select className="border p-2"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
        >
          <option>Diploma</option>
          <option>Undergraduate</option>
          <option>Postgraduate</option>
        </select>

        <input placeholder="Duration" className="border p-2"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />

        <textarea placeholder="Description" className="border p-2 col-span-2"
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
            <p className="text-sm text-gray-600">{c.level} · {c.duration}</p>
          </div>
          <button onClick={() => del(c.id)} className="text-red-600">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
