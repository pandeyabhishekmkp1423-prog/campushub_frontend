import { useState } from "react";
import api from "../../services/api";

export default function ManageGallery() {
  const [category, setCategory] = useState("events");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* =========================
     FILE CHANGE HANDLER
  ========================= */
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setMessage("");
  };

  /* =========================
     UPLOAD HANDLER
  ========================= */
  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("❌ Please select an image before uploading");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);

    try {
      setLoading(true);

      await api.post("/admin/gallery/upload", formData);

      setMessage("✅ Image uploaded successfully");
      setFile(null);
      setPreview(null);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "❌ Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Manage Campus Gallery
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Upload images that will appear in Campus Memories
        </p>
      </div>

      {/* CARD */}
      <form
        onSubmit={handleUpload}
        className="bg-white rounded-xl shadow-lg p-6 space-y-6"
      >
        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Select Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="events">Events</option>
            <option value="convocation">Convocation</option>
            <option value="fresher">Fresher Party</option>
            <option value="placements">Placements</option>
            <option value="labs">Labs</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        {/* FILE INPUT */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Upload Image
          </label>

          <div className="border-2 border-dashed border-slate-300 rounded-lg
                          p-6 text-center hover:border-teal-500 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="gallery-upload"
            />
            <label
              htmlFor="gallery-upload"
              className="cursor-pointer text-sm text-slate-600"
            >
              Click to select an image
              <br />
              <span className="text-xs text-slate-400">
                JPG, PNG • Max 5MB
              </span>
            </label>
          </div>
        </div>

        {/* PREVIEW */}
        {preview && (
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">
              Preview
            </p>
            <img
              src={preview}
              alt="Preview"
              className="h-48 w-full object-cover rounded-lg border"
            />
          </div>
        )}

        {/* ACTION */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-teal-600 text-white
                     font-semibold shadow-md hover:bg-teal-700
                     transition disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

        {/* MESSAGE */}
        {message && (
          <p className="text-sm text-center mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
