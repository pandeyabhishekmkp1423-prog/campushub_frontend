import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";
import logo from "../assets/logo.svg";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaGraduationCap,
  FaPaperPlane,
} from "react-icons/fa";

export default function Enquiry() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course_interest: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD COURSES
  ========================= */
  useEffect(() => {
    publicApi
      .get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) =>
        console.error("COURSES LOAD ERROR:", err)
      );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Submitting...");

    try {
      await publicApi.post("/enquiry", form);
      setStatus("✅ Enquiry submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        course_interest: "",
        message: "",
      });
    } catch {
      setStatus("❌ Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(2, 6, 23, 0.75),
            rgba(2, 6, 23, 0.85)
          ),
          url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1")
        `,
      }}
    >
      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl
                   rounded-2xl shadow-2xl p-8 space-y-5
                   animate-fadeIn"
      >
        {/* LOGO */}
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="CampusHub"
            className="h-14 mx-auto mb-2"
          />
          <h1 className="text-2xl font-extrabold text-slate-900">
            Admission Enquiry
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Start your journey with CampusHub
          </p>
        </div>

        <Input
          icon={<FaUser />}
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          icon={<FaEnvelope />}
          placeholder="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          icon={<FaPhoneAlt />}
          placeholder="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        {/* COURSE DROPDOWN */}
        <div className="relative">
          <FaGraduationCap className="absolute left-3 top-3.5 text-teal-600" />
          <select
            name="course_interest"
            value={form.course_interest}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-3 py-2.5 rounded-lg border
                       focus:ring-2 focus:ring-teal-500
                       outline-none transition"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message (optional)"
          className="w-full border rounded-lg p-3 h-24
                     focus:ring-2 focus:ring-teal-500
                     outline-none transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700
                     text-white py-3 rounded-lg font-semibold
                     flex items-center justify-center gap-2
                     transition hover:scale-[1.02]"
        >
          <FaPaperPlane />
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>

        {status && (
          <p className="text-center text-sm mt-2">
            {status}
          </p>
        )}
      </form>
    </section>
  );
}

/* =========================
   REUSABLE INPUT
========================= */
function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-3.5 text-teal-600">
        {icon}
      </span>
      <input
        {...props}
        required
        className="w-full pl-10 pr-3 py-2.5 rounded-lg border
                   focus:ring-2 focus:ring-teal-500
                   outline-none transition"
      />
    </div>
  );
}
