import { useEffect, useState, useCallback } from "react";
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
    <div className="group py-4 border-b last:border-none hover:bg-slate-50 px-2 rounded-md">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 text-sm font-semibold">
            {index + 1}
          </span>
        </div>

        <div>
          <p className="text-[15px] font-semibold text-slate-900">
            {title}
          </p>
          <p className="text-sm text-slate-600 mt-1">
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
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b">
        <span className="text-teal-600 text-xl">{icon}</span>
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="ml-auto text-xs bg-slate-100 px-3 py-1 rounded-full">
          {notices.length} Notices
        </span>
      </div>

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
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH NOTICES (SAFE)
  ========================= */
  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await publicApi.get("/notices");
      setNotices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load public notices", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* =========================
     LOAD + REFRESH ON TAB FOCUS
========================= */
  useEffect(() => {
    fetchNotices();

    // ✅ Stable & reliable refresh
    const onFocus = () => fetchNotices();
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, [fetchNotices]);

  /* =========================
     CATEGORY FILTER
  ========================= */
  const byCategory = (cat) =>
    notices.filter((n) => n.category === cat);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading notices…
      </div>
    );
  }

  return (
    <section className="py-28 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold">
            University Notice Board
          </h2>
          <p className="text-slate-600 mt-4 max-w-3xl mx-auto text-lg">
            Official announcements, academic updates, and institutional
            communications from CampusHub University.
          </p>
        </div>

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
