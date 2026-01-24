import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageEnquiries() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD ENQUIRIES
  ========================= */
  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const res = await api.get("/admin/enquiries");
        setData(res.data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch enquiries:", err);
        setError("Failed to load enquiries");
      } finally {
        setLoading(false);
      }
    };

    loadEnquiries();
  }, []);

  /* =========================
     STATES
  ========================= */
  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">Loading student enquiries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Student Enquiries
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Admission and course-related enquiries submitted by students
        </p>
      </div>

      {/* CONTENT */}
      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-slate-500 text-sm">
            No enquiries have been received yet.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Phone
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Course Interest
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((e, index) => (
                <tr
                  key={e.id}
                  className={`border-b last:border-none
                    ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    hover:bg-teal-50 transition`}
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {e.name}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {e.email}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {e.phone}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {e.course_interest}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
