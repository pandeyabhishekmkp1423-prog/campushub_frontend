import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 sm:grid-cols-2 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="CampusHub" className="w-11 h-11" />
            <div>
              <h3 className="text-2xl font-bold text-white">CampusHub</h3>
              <p className="text-xs text-slate-400 tracking-wide">
                UNIVERSITY PORTAL
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            CampusHub is a modern digital university platform focused on
            academic excellence, campus life, admissions, and student
            engagement through smart technology.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-4 mt-6">
            <SocialIcon><FaFacebookF /></SocialIcon>
            <SocialIcon><FaInstagram /></SocialIcon>
            <SocialIcon><FaLinkedinIn /></SocialIcon>
            <SocialIcon><FaTwitter /></SocialIcon>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <FooterTitle>Quick Links</FooterTitle>
          <ul className="space-y-3 text-sm">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/courses">Courses</FooterLink>
            <FooterLink to="/enquiry">Admission Enquiry</FooterLink>
            <FooterLink to="/login">Student Login</FooterLink>
          </ul>
        </div>

        {/* ACADEMICS */}
        <div>
          <FooterTitle>Academics</FooterTitle>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>Admissions</li>
            <li>Examinations</li>
            <li>Results</li>
            <li>Scholarships</li>
            <li>Research & Innovation</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <FooterTitle>Contact Us</FooterTitle>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 items-start">
              <FaMapMarkerAlt className="text-teal-500 mt-1" />
              <span>
                CampusHub University<br />
                Knowledge Park, India
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <FaPhoneAlt className="text-teal-500" />
              +91 98765 43210
            </li>
            <li className="flex gap-3 items-center">
              <FaEnvelope className="text-teal-500" />
              admissions@campushub.edu
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-700 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} CampusHub University. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs uppercase tracking-wide">
            <span>NAAC A+</span>
            <span>ISO 9001:2015</span>
            <span>UGC Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- HELPERS ---------- */

function FooterTitle({ children }) {
  return (
    <h4 className="text-lg font-semibold text-white mb-4">
      {children}
    </h4>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="hover:text-teal-400 transition">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ children }) {
  return (
    <div className="w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition cursor-pointer">
      {children}
    </div>
  );
}
