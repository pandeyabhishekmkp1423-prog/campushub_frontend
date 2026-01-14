import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center px-8 py-3 gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="CampusHub Logo" className="w-9 h-9" />
          <span className="text-2xl font-bold text-teal-700">
            CampusHub
          </span>
        </div>

        {/* Notification Ticker */}
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee text-sm text-red-600 font-semibold">
            🔔 Admissions Open 2026 • Semester Exams from 10 April • Convocation Ceremony Updates
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <Link to="/courses" className="hover:text-teal-600">Courses</Link>
          <Link to="/login" className="hover:text-teal-600">Login</Link>
           <Link to="/enquiry" className="hover:text-teal-600">Enquiry</Link>
        </nav>
      </div>
    </header>
  );
}
