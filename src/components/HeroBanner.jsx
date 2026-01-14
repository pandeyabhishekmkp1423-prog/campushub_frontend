import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

return (
  <section
    className="h-[55vh] bg-cover bg-center flex items-center justify-center text-white transition-all"
    style={{ backgroundImage: `url(${images[index]})` }}
  >
    <div className="bg-black/60 w-full h-full flex items-center justify-center text-center">
      <div className="px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Shaping the Future Through Education
        </h1>

        <p className="text-lg md:text-xl opacity-90 mb-8">
          Discover world-class courses, vibrant campus life, academic excellence,
          and achievements that shape tomorrow’s leaders at CampusHub.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/courses"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full shadow-md transition"
          >
            Explore Courses
          </a>

          <a
            href="#memories"
            className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            Campus Memories
          </a>
        </div>
      </div>
    </div>
  </section>
);
}
