import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate(data.role === "admin" ? "/admin" : "/");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="CampusHub" className="h-12" />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-slate-900">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-slate-600 mt-2 mb-8">
          Login to access your CampusHub dashboard
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full px-4 py-3 rounded-lg border border-slate-300
                       focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full px-4 py-3 rounded-lg border border-slate-300
                       focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-teal-600 text-white
                     font-semibold shadow-md hover:bg-teal-700
                     transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-slate-500 mt-6">
          Authorized users only. Contact administration for access.
        </p>
      </div>
    </div>
  );
}
