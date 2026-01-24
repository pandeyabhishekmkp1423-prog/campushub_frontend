import { useEffect, useState } from "react";
import api from "../../services/api";

export default function RegisteredUsers() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     LOAD ENQUIRIES
  ========================= */
  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const res = await api.get("/admin/enquiries");
        setEnquiries(res.data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch enquiries:", err);
        setError("Unable to load enquiry submissions");
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
        <p className="text-slate-500">Loading enquiry submissions...</p>
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
    <div className="p-8">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Enquiry Submissions
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Admission and course enquiries submitted by prospective students
        </p>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No enquiries have been submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              {/* TABLE HEAD */}
              <thead className="bg-slate-100 sticky top-0">
                <tr>
                  <th className="p-4 text-left font-semibold text-slate-700">
                    Name
                  </th>
                  <th className="p-4 text-left font-semibold text-slate-700">
                    Email
                  </th>
                  <th className="p-4 text-left font-semibold text-slate-700">
                    Phone
                  </th>
                  <th className="p-4 text-left font-semibold text-slate-700">
                    Course
                  </th>
                  <th className="p-4 text-left font-semibold text-slate-700">
                    Message
                  </th>
                  <th className="p-4 text-left font-semibold text-slate-700">
                    Date
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {enquiries.map((e) => (
                  <tr
                    key={e.id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="p-4 font-medium text-slate-900">
                      {e.name}
                    </td>

                    <td className="p-4 text-slate-700">
                      {e.email}
                    </td>

                    <td className="p-4 text-slate-700">
                      {e.phone}
                    </td>

                    <td className="p-4">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-teal-50 text-teal-700">
                        {e.course_interest}
                      </span>
                    </td>

                    <td
                      className="p-4 max-w-xs truncate text-slate-600"
                      title={e.message || ""}
                    >
                      {e.message || "—"}
                    </td>

                    <td className="p-4 text-slate-500">
                      {new Date(e.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
