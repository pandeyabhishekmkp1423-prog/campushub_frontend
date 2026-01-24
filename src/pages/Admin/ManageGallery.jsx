import { useState } from "react";
import api from "../../services/api";

export default function ManageGallery() {
  const [category, setCategory] = useState("events");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);

    try {
      setLoading(true);
      await api.post("/admin/gallery/upload", formData);
      setMessage("Image uploaded successfully");
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="events">Events</option>
        <option value="convocation">Convocation</option>
        <option value="fresher">Fresher</option>
        <option value="placements">Placements</option>
        <option value="labs">Labs</option>
        <option value="sports">Sports</option>
      </select>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
      {message && <p>{message}</p>}
    </form>
  );
}
