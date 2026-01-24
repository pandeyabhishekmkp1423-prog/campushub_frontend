import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import logo from "../../assets/logo.svg";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     SUBMIT HANDLER
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/admin/login", {
        email,
        password,
      });

      // Store admin session
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminRole", res.data.role);

      // Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
                 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1)",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-900/70" />

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white/90
                   backdrop-blur-xl rounded-2xl shadow-2xl
                   p-10 space-y-5 animate-fadeIn"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="CampusHub" className="h-12" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Secure Admin Login
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            CampusHub Administration Panel
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Admin Email
          </label>
          <input
            type="email"
            placeholder="admin@campushub.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full px-4 py-3 rounded-lg border
                       border-slate-300 focus:outline-none
                       focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-3 rounded-lg border
                       border-slate-300 focus:outline-none
                       focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-teal-600
                     text-white font-semibold shadow-md
                     hover:bg-teal-700 transition
                     disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-slate-400 mt-3">
          Authorized personnel only. Unauthorized access prohibited.
        </p>
      </form>
    </div>
  );
}
