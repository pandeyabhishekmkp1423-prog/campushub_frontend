export default function StatsSection() {
  const stats = [
    {
      value: "25+",
      label: "Years of Excellence",
      sub: "In higher education",
    },
    {
      value: "120+",
      label: "Academic Programs",
      sub: "UG, PG & Doctoral",
    },
    {
      value: "18,000+",
      label: "Students Enrolled",
      sub: "From across the globe",
    },
    {
      value: "96%",
      label: "Placement Rate",
      sub: "Top recruiters worldwide",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Our Impact in Numbers
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            A legacy of academic excellence, innovation, and career success
            that defines CampusHub University.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="group bg-slate-50 rounded-2xl p-8 text-center
                         shadow-sm hover:shadow-xl transition-all duration-300
                         hover:-translate-y-2"
            >
              <p className="text-4xl md:text-5xl font-extrabold text-teal-600 mb-3">
                {item.value}
              </p>
              <h3 className="text-lg font-semibold text-slate-900">
                {item.label}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
