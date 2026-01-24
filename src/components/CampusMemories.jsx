import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";

const categories = [
  { key: "convocation", title: "Convocation" },
  { key: "events", title: "Events" },
  { key: "fresher", title: "Fresher Party" },
  { key: "placements", title: "Placement Cell" },
  { key: "labs", title: "Labs" },
  { key: "sports", title: "Sports" },
];

export default function CampusMemories() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const result = [];

        for (const cat of categories) {
          const res = await publicApi.get(`/gallery/${cat.key}`);

          if (res.data && res.data.length > 0) {
            result.push({
              title: cat.title,
              images: res.data.map((img) => img.image_url), // ✅ Supabase public URL
            });
          }
        }

        setData(result);
      } catch (err) {
        console.error("CAMPUS MEMORIES ERROR:", err);
      }
    };

    fetchAllCategories();
  }, []);

  const open = (cat) => {
    setActive(cat);
    setIndex(0);
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold">Campus Memories</h2>
        <p className="text-gray-600 mt-3">
          Moments that define life at CampusHub
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {data.map((cat, i) => (
          <div
            key={i}
            onClick={() => open(cat)}
            className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer
                       shadow-lg hover:shadow-2xl transition hover:-translate-y-2"
          >
            <img
              src={cat.images[0]}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover
                         transition-transform duration-700
                         group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">
                {cat.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* IMAGE MODAL */}
      {active && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl w-full px-6">
            <img
              src={active.images[index]}
              className="w-full h-[70vh] object-cover rounded-xl"
              alt="Campus Memory"
            />

            {active.images.length > 1 && (
              <button
                onClick={() =>
                  setIndex((index + 1) % active.images.length)
                }
                className="absolute right-8 top-1/2 text-white text-4xl"
              >
                ›
              </button>
            )}

            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
