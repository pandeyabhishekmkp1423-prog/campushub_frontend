import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await publicApi.get("/public/gallery");
        setImages(res.data || []);
      } catch (err) {
        console.error("GALLERY FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return <p className="p-8">Loading gallery...</p>;
  }

  return (
    <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img) => (
        <img
          key={img.id}
          src={img.image_url}   // ✅ SUPABASE PUBLIC URL
          alt={img.category}
          className="rounded shadow h-56 w-full object-cover"
          loading="lazy"
        />
      ))}

      {images.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          No images available
        </p>
      )}
    </div>
  );
}
