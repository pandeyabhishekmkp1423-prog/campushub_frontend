import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ManageEnquiries() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/admin/enquiries").then(res => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Student Enquiries</h2>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Course</th>
          </tr>
        </thead>
        <tbody>
          {data.map(e => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
              <td>{e.course_interest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
