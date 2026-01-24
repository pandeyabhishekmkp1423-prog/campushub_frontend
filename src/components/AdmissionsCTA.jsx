import { Link } from "react-router-dom";

export default function AdmissionsCTA() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-r from-teal-700 to-teal-600 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Admissions Open for 2026
        </h2>

        <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-10">
          Join a future-focused institution with world-class faculty,
          industry-aligned curriculum, and a vibrant campus life.
          Your journey begins here.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Link
            to="/enquiry"
            className="bg-white text-teal-700 font-semibold
                       px-8 py-4 rounded-full shadow-lg
                       hover:bg-teal-50 transition"
          >
            Apply Now
          </Link>

          <Link
            to="/courses"
            className="border border-white/70 px-8 py-4 rounded-full
                       font-semibold hover:bg-white hover:text-teal-700
                       transition"
          >
            View Courses
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 text-sm opacity-90">
          <div>🏆 NAAC Accredited</div>
          <div>🌍 Global Alumni Network</div>
          <div>💼 90% Placement Record</div>
        </div>
      </div>
    </section>
  );
}
