import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const name = localStorage.getItem("name");

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {name}
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <Link to="/student/profile" className="card">My Profile</Link>
        <Link to="/student/fees" className="card">Fees</Link>
        <Link to="/student/schedule" className="card">Schedule</Link>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="card bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
