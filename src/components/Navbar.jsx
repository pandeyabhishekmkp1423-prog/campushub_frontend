import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

/* =========================
   ANNOUNCEMENTS
========================= */
const announcements = [
  "🏐 North Zone Inter-University Volleyball Women Championship 2025–26",
  "🎓 Admissions Open for Academic Year 2026",
  "📝 Semester Examinations begin from 10 April",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  /* Rotate announcement (desktop only) */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* ================= TOP BAR ================= */}
      <div className="bg-slate-900 text-slate-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2">

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-3 items-center">
            <div className="whitespace-nowrap">
              📍 Established 1998 • NAAC A+ Accredited
            </div>

            <div className="text-center text-amber-400 font-semibold">
              {announcements[index]}
            </div>

            <div className="text-right whitespace-nowrap">
              📧 admissions@campushub.edu | ☎ +91 98765 43210
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden text-center text-amber-400 font-medium">
            {announcements[0]}
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV ================= */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="CampusHub" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-extrabold text-slate-900">
                  CampusHub
                </h1>
                <p className="text-[10px] tracking-widest text-teal-700 uppercase">
                  University
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
              {[
                { name: "Home", path: "/" },
                { name: "Academics", path: "/courses" },
                { name: "Campus Life", path: "/campus-memories" },
                { name: "Admissions", path: "/enquiry" },
                { name: "Student Portal", path: "/login" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* DESKTOP CTA */}
            <Link
              to="/enquiry"
              className="hidden lg:inline-flex px-5 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700"
            >
              Apply Now
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE DRAWER (BOTTOM SHEET) ================= */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl p-6 animate-slide-up">

            {/* HANDLE */}
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-6" />

            <nav className="flex flex-col gap-5 text-base font-semibold text-slate-800">
              <MobileLink to="/" close={() => setOpen(false)}>Home</MobileLink>
              <MobileLink to="/courses" close={() => setOpen(false)}>Academics</MobileLink>
              <MobileLink to="/campus-memories" close={() => setOpen(false)}>Campus Life</MobileLink>
              <MobileLink to="/enquiry" close={() => setOpen(false)}>Admissions</MobileLink>
              <MobileLink to="/login" close={() => setOpen(false)}>Student Portal</MobileLink>

              <Link
                to="/enquiry"
                onClick={() => setOpen(false)}
                className="mt-4 bg-teal-600 text-white py-3 rounded-xl text-center text-lg"
              >
                Apply Now
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

/* =========================
   HELPERS
========================= */
function MobileLink({ to, close, children }) {
  return (
    <Link
      to={to}
      onClick={close}
      className="py-2 border-b border-slate-100"
    >
      {children}
    </Link>
  );
}
