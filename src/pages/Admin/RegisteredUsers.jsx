import { useEffect, useState } from "react";
import api from "../../services/api";

export default function RegisteredUsers() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    api.get("/admin/enquiries")
      .then(res => setEnquiries(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Enquiry Submissions</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Course</th>
              <th className="p-3">Message</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e) => (
              <tr key={e.id} className="border-t hover:bg-slate-50">
                <td className="p-3">{e.name}</td>
                <td className="p-3">{e.email}</td>
                <td className="p-3">{e.phone}</td>
                <td className="p-3">{e.course_interest}</td>
                <td className="p-3 max-w-xs truncate">{e.message}</td>
                <td className="p-3">
                  {new Date(e.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {enquiries.length === 0 && (
          <p className="p-6 text-center text-gray-500">
            No enquiries yet
          </p>
        )}
      </div>
    </div>
  );
}
