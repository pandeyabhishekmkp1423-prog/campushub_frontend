import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-[65vh] md:h-[75vh] bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          
          {/* TEXT */}
          <div className="text-white animate-fadeIn">
            <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs tracking-widest bg-teal-600/90 uppercase">
              Trusted Since 1998
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Shaping the Future <br />
              <span className="text-teal-400">Through Education</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-xl mb-10">
              World-class academics, innovative research, and a vibrant campus
              environment designed to empower tomorrow’s global leaders.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/courses"
                className="px-8 py-3 rounded-full bg-teal-600 text-white
                           font-semibold shadow-lg hover:bg-teal-700 transition"
              >
                Explore Courses
              </a>

              <a
                href="/campus-memories"
                className="px-8 py-3 rounded-full border border-white/80
                           text-white hover:bg-white hover:text-black transition"
              >
                Campus Life
              </a>
            </div>
          </div>

          {/* RIGHT DECORATIVE PANEL (DESKTOP ONLY) */}
          <div className="hidden md:flex justify-end">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl w-80">
              <h3 className="text-white font-bold text-lg mb-4">
                Why Choose CampusHub?
              </h3>
              <ul className="text-slate-200 text-sm space-y-3">
                <li>✔ NAAC A+ Accredited University</li>
                <li>✔ 100+ Industry-Aligned Programs</li>
                <li>✔ Global Alumni Network</li>
                <li>✔ Modern Labs & Research Centers</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
