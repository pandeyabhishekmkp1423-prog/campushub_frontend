import { useState } from "react";
import api from "../../services/api";

export default function ManageGallery() {
  const [category, setCategory] = useState("events");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!imageUrl) {
      setMessage("Please provide image URL");
      return;
    }

    setLoading(true);

    try {
      await api.post("/admin/gallery", {
        category,
        image_url: imageUrl,
      });

      setMessage("✅ Image saved successfully");
      setImageUrl("");
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      setMessage("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl">
      <h2 className="text-2xl font-bold mb-6">Manage Gallery</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="convocation">Convocation</option>
          <option value="events">Events</option>
          <option value="fresher">Fresher Party</option>
          <option value="placements">Placement Cell</option>
          <option value="labs">Labs</option>
          <option value="sports">Sports</option>
        </select>

        <input
          type="url"
          placeholder="Paste image public URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          disabled={loading}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Image"}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
