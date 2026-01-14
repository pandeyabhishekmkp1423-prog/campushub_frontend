import { useState } from "react";
import api from "../../services/api";

export default function ManageGallery() {
  const [category, setCategory] = useState(1);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!image) {
      setMessage("Please select an image");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("image", image);

    try {
      await api.post("/gallery/upload", formData);
      setMessage("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
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
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          disabled={loading}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
