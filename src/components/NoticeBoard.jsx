import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    publicApi.get("/notices").then((res) => {
      setNotices(res.data);
    });
  }, []);

  const byCategory = (cat) =>
    notices.filter((n) => n.category === cat);

  const Column = ({ title, items, color }) => (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-bold ${color}`}>
          {title}
        </h3>
        <span className="text-xs text-gray-400">
          {items.length} Updates
        </span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scroll">
        {items.length === 0 && (
          <p className="text-sm text-gray-400 italic">
            No notices available
          </p>
        )}

        {items.map((n) => (
          <div
            key={n.id}
            className="group border-l-4 pl-4 border-gray-200 hover:border-teal-600 transition"
          >
            <p className="font-medium text-sm text-gray-800 group-hover:text-teal-700">
              {n.title}
            </p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {n.description}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t text-right">
        <button className="text-xs text-teal-600 hover:text-white hover:bg-teal-600 px-4 py-2 rounded-full transition">
          View All →
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-20 px-6 bg-slate-100">
      {/* Section Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-slate-900">
          Notice Board
        </h2>
        <p className="text-slate-500 mt-3">
          Latest updates & important announcements
        </p>
      </div>

      {/* Notice Columns */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <Column
          title="General Notices"
          items={byCategory("general")}
          color="text-indigo-600"
        />
        <Column
          title="Examination Updates"
          items={byCategory("examination")}
          color="text-rose-600"
        />
        <Column
          title="Admissions"
          items={byCategory("admission")}
          color="text-emerald-600"
        />
      </div>
    </section>
  );
}
