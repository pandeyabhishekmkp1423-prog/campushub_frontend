import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

/* =========================
   ANNOUNCEMENTS (FRONTEND)
========================= */
const announcements = [
  "🏐 North Zone Inter-University Volleyball Women Championship 2025–26",
  "🎓 Admissions Open for Academic Year 2026",
  "📝 Semester Examinations begin from 10 April",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  /* Rotate announcement */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* ================= TOP UTILITY BAR ================= */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-1 md:grid-cols-3 items-center gap-3">

          {/* LEFT INFO */}
          <div className="text-center md:text-left whitespace-nowrap">
            📍 Established 1998 • NAAC A+ Accredited
          </div>

          {/* CENTER ANNOUNCEMENT */}
          <div className="relative overflow-hidden text-center">
            <span
              key={index}
              className="inline-block text-amber-400 font-semibold
                         animate-fade-slide"
            >
              {announcements[index]}
            </span>
          </div>

          {/* RIGHT INFO */}
          <div className="text-center md:text-right whitespace-nowrap">
            📧 admissions@campushub.edu | ☎ +91 98765 43210
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV ================= */}
      <div className="bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-4">
              <img src={logo} alt="CampusHub" className="w-12 h-12" />
              <div className="leading-tight">
                <h1 className="text-2xl font-extrabold tracking-wide text-slate-900">
                  CampusHub
                </h1>
                <p className="text-xs tracking-widest text-teal-700 uppercase">
                  University
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-700">
              {[
                { name: "Home", path: "/" },
                { name: "Academics", path: "/courses" },
                { name: "Campus Life", path: "/campus-memories" },
                { name: "Admissions", path: "/enquiry" },
                { name: "Student Portal", path: "/login" },
              ].map((item) => (
                <Link key={item.name} to={item.path} className="relative group">
                  {item.name}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600
                               transition-all duration-300 group-hover:w-full"
                  />
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex">
              <Link
                to="/enquiry"
                className="px-6 py-2 rounded-full bg-teal-600 text-white
                           font-semibold shadow-md hover:bg-teal-700 transition"
              >
                Apply Now
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button onClick={() => setOpen(true)} className="lg:hidden">
              <svg
                className="w-8 h-8 text-slate-900"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-6">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
            >
              <svg
                className="w-7 h-7 text-slate-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <nav className="mt-12 flex flex-col gap-6 text-slate-800 font-semibold">
              <Link to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/courses" onClick={() => setOpen(false)}>Academics</Link>
              <Link to="/campus-memories" onClick={() => setOpen(false)}>Campus Life</Link>
              <Link to="/enquiry" onClick={() => setOpen(false)}>Admissions</Link>
              <Link to="/login" onClick={() => setOpen(false)}>Student Portal</Link>

              <Link
                to="/enquiry"
                onClick={() => setOpen(false)}
                className="mt-6 bg-teal-600 text-white py-3 rounded-lg text-center"
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
