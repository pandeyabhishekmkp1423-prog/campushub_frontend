import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminRole", res.data.role);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      {/* Background */}
      <div className="admin-bg" />

      {/* Login Card */}
      <form onSubmit={handleSubmit} className="admin-card animate-fadeIn">
        <img src={logo} alt="CampusHub" className="admin-logo" />

        <h1 className="admin-title">Secure Admin Login</h1>
        <p className="admin-subtitle">
          Welcome to CampusHub Administration
        </p>

        {error && <p className="admin-error">{error}</p>}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-xs text-slate-400 mt-4">
          Authorized personnel only
        </p>
      </form>
    </div>
  );
}
