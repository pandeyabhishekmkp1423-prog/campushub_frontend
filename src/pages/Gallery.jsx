import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    publicApi.get("/gallery/events").then((res) => {
      setImages(res.data);
    });
  }, []);

  return (
    <div className="p-8 grid grid-cols-3 gap-4">
      {images.map((img) => (
        <img
          key={img.id}
          src={`http://localhost:5000/${img.image_url}`}
          className="rounded shadow"
        />
      ))}
    </div>
  );
}
