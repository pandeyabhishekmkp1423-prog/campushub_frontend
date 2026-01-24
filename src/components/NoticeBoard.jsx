import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";
import {
  FaBullhorn,
  FaClipboardList,
  FaGraduationCap,
} from "react-icons/fa";

/* =========================
   SINGLE NOTICE ROW
========================= */
function NoticeRow({ index, title, description }) {
  return (
    <div
      className="group py-4 border-b last:border-none transition
                 hover:bg-slate-50 px-2 rounded-md"
    >
      <div className="flex gap-4">
        {/* NUMBER */}
        <div className="flex-shrink-0">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-full
                       bg-slate-100 text-slate-700 text-sm font-semibold
                       group-hover:bg-teal-600 group-hover:text-white transition"
          >
            {index + 1}
          </span>
        </div>

        {/* CONTENT */}
        <div>
          <p className="text-[15px] font-semibold text-slate-900 tracking-tight">
            {title}
          </p>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================
   NOTICE SECTION
========================= */
function NoticeSection({ icon, title, notices }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6 pb-3 border-b">
        <span className="text-teal-600 text-xl">{icon}</span>
        <h3 className="text-lg font-bold text-slate-800 tracking-wide">
          {title}
        </h3>
        <span className="ml-auto text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600">
          {notices.length} Notices
        </span>
      </div>

      {/* BODY */}
      {notices.length === 0 ? (
        <p className="text-sm text-slate-400 italic">
          No notices available
        </p>
      ) : (
        notices.map((n, i) => (
          <NoticeRow
            key={n.id}
            index={i}
            title={n.title}
            description={n.description}
          />
        ))
      )}
    </div>
  );
}

/* =========================
   MAIN NOTICE BOARD
========================= */
export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    publicApi.get("/notices").then((res) => setNotices(res.data));
  }, []);

  const byCategory = (cat) =>
    notices.filter((n) => n.category === cat);

  return (
    <section
      className="py-28 px-6"
      style={{
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">
            University Notice Board
          </h2>
          <p className="text-slate-600 mt-4 max-w-3xl mx-auto text-lg">
            Official announcements, academic updates, and institutional
            communications from CampusHub University.
          </p>
        </div>

        {/* THREE SEPARATE SECTIONS */}
        <div className="grid md:grid-cols-3 gap-10">
          <NoticeSection
            title="General Announcements"
            icon={<FaBullhorn />}
            notices={byCategory("general")}
          />

          <NoticeSection
            title="Examination Updates"
            icon={<FaClipboardList />}
            notices={byCategory("examination")}
          />

          <NoticeSection
            title="Admissions & Academics"
            icon={<FaGraduationCap />}
            notices={byCategory("admission")}
          />
        </div>
      </div>
    </section>
  );
}
