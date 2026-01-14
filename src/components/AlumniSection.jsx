export default function AlumniSection() {
  const alumni = [
    {
      name: "Dr. Ananya Sharma",
      role: "Senior Scientist, ISRO",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
    {
      name: "Rahul Verma",
      role: "Software Engineer, Google",
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    },
    {
      name: "Neha Singh",
      role: "IAS Officer",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    },
    {
      name: "Amit Patel",
      role: "Founder & CEO, EduTech Startup",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-gray-900">
          OUR ALUMNI, OUR PRIDE
        </h2>
        <p className="text-lg text-gray-600 mt-3">
          Our illustrious alumni, creating a difference around the world.
        </p>
      </div>

      {/* Alumni Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {alumni.map((a, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl shadow hover:shadow-2xl transition hover:-translate-y-2 cursor-pointer"
          >
            <img
              src={a.image}
              alt={a.name}
              className="w-full h-64 object-cover rounded-t-xl"
            />

            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">
                {a.name}
              </h3>
              <p className="text-sm text-teal-600 font-medium mt-2">
                {a.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
