import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    publicApi.get("/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-10 text-center">Courses</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {courses.map((c) => (
          <div key={c.id} className="border rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{c.name}</h3>
            <p className="text-sm text-teal-600">{c.level}</p>
            <p className="text-sm text-gray-500">{c.duration}</p>
            <p className="mt-3 text-gray-700">{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
