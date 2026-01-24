import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageEnquiries() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const res = await api.get("/admin/enquiries");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch enquiries:", err);
        setError("Failed to load enquiries");
      } finally {
        setLoading(false);
      }
    };

    loadEnquiries();
  }, []);

  if (loading) return <p className="p-6">Loading enquiries...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Student Enquiries</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No enquiries found</p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Course</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e.id} className="border-b">
                <td className="p-2">{e.name}</td>
                <td className="p-2">{e.email}</td>
                <td className="p-2">{e.phone}</td>
                <td className="p-2">{e.course_interest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
