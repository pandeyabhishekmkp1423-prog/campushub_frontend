import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef(null);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-slate-900 text-gray-300 pt-20 pb-8 px-6
                 opacity-0 translate-y-10 transition-all duration-700"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">

        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} className="w-12 h-12" />
            <h3 className="text-2xl font-bold text-white">CampusHub</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            CampusHub is a modern university platform delivering notices,
            events, alumni achievements, and student services through
            a smart digital ecosystem.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-teal-400">Home</Link></li>
            <li><Link to="/gallery" className="hover:text-teal-400">Gallery</Link></li>
            <li><Link to="/login" className="hover:text-teal-400">Login</Link></li>
            <li><Link to="/register" className="hover:text-teal-400">Register</Link></li>
          </ul>
        </div>

        {/* Academics */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Academics
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Admissions</li>
            <li>Examinations</li>
            <li>Results</li>
            <li>Scholarships</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Stay Updated
          </h4>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to receive university updates.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l bg-slate-800 text-sm
                         focus:outline-none"
            />
            <button
              className="bg-teal-600 px-4 py-2 rounded-r hover:bg-teal-700"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a className="p-2 rounded-full bg-slate-800 hover:bg-teal-600 transition">
              <Facebook size={18} />
            </a>
            <a className="p-2 rounded-full bg-slate-800 hover:bg-teal-600 transition">
              <Linkedin size={18} />
            </a>
            <a className="p-2 rounded-full bg-slate-800 hover:bg-teal-600 transition">
              <Twitter size={18} />
            </a>
            <a className="p-2 rounded-full bg-slate-800 hover:bg-teal-600 transition">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 mt-14 pt-6 text-center text-sm text-gray-400">
        © 2026 CampusHub University. All Rights Reserved.
        <br />
        Designed & Developed for Academic Demonstration.
      </div>
    </footer>
  );
}
