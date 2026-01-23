import { useState } from "react";
import api from "../../services/api";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function ManageGallery() {
  const [category, setCategory] = useState("events");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!image) {
      setMessage("Please select an image");
      return;
    }

    setLoading(true);

    try {
      /* 1️⃣ Upload to Supabase Storage */
      const filePath = `${category}/${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, image);

      if (uploadError) throw uploadError;

      /* 2️⃣ Get public URL */
      const { data } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      /* 3️⃣ Save URL in DB via backend */
      await api.post("/admin/gallery", {
        category,
        image_url: publicUrl,
      });

      setMessage("✅ Image uploaded successfully");
      setImage(null);
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
