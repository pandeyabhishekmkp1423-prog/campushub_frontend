import { useState } from "react";
import publicApi from "../services/publicApi";
import logo from "../assets/logo.svg";

export default function Enquiry() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course_interest: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    setLoading(true);

    try {
      const res = await publicApi.post("/enquiry", form);
      console.log("ENQUIRY RESPONSE:", res.data);

      setStatus("✅ Enquiry submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        course_interest: "",
        message: "",
      });
    } catch (err) {
      console.error("ENQUIRY ERROR:", err);
      setStatus("❌ Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-bg" />

      <form onSubmit={handleSubmit} className="admin-card animate-fadeIn">
        <img src={logo} alt="CampusHub" className="admin-logo" />

        <h1 className="admin-title">Admission Enquiry</h1>
        <p className="admin-subtitle">We will contact you shortly</p>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />

        <input
          name="course_interest"
          value={form.course_interest}
          onChange={handleChange}
          placeholder="Course Interested"
          required
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          className="h-24"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>

        {status && <p className="text-sm mt-4">{status}</p>}
      </form>
    </div>
  );
}
