import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";

const LEVELS = ["All", "Diploma", "Undergraduate", "Postgraduate"];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    publicApi.get("/courses").then((res) => setCourses(res.data));
  }, []);

  const filteredCourses =
    filter === "All"
      ? courses
      : courses.filter((c) => c.level === filter);

  return (
    <section className="bg-slate-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Academic Programs
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Explore a diverse range of industry-aligned programs designed
            to prepare you for global careers.
          </p>
        </div>

        {/* FILTER */}
        <div className="flex justify-center flex-wrap gap-3 mb-14">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition
                ${
                  filter === lvl
                    ? "bg-teal-600 text-white shadow"
                    : "bg-white text-slate-600 hover:bg-teal-50"
                }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* COURSES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className="group bg-white rounded-2xl p-7 shadow-sm
                         hover:shadow-2xl transition-all duration-300
                         hover:-translate-y-2"
            >
              {/* ICON */}
              <div className="w-12 h-12 flex items-center justify-center
                              rounded-xl bg-teal-100 text-teal-600
                              text-xl font-bold mb-5">
                🎓
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {c.name}
              </h3>

              {/* META */}
              <div className="flex gap-4 text-sm text-slate-500 mb-3">
                <span>{c.level}</span>
                <span>•</span>
                <span>{c.duration}</span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {c.description}
              </p>

              {/* CTA (future-ready) */}
              <button
                className="text-teal-600 font-semibold text-sm
                           hover:underline"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredCourses.length === 0 && (
          <p className="text-center text-slate-500 mt-16">
            No courses available for this category.
          </p>
        )}
      </div>
    </section>
  );
}
