import { useEffect } from "react";

import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import StatsSection from "../components/StatsSection";
import NoticeBoard from "../components/NoticeBoard";
import CampusMemories from "../components/CampusMemories";
import AdmissionsCTA from "../components/AdmissionsCTA";
import AlumniSection from "../components/AlumniSection";
import Footer from "../components/Footer";
import CursorEffects from "../components/CursorEffects";

export default function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const onScroll = () => {
      reveals.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 120) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* 🌟 Global cursor glow */}
      <CursorEffects />

      {/* 🔝 NAVBAR */}
      <Navbar />

      {/* 🎓 HERO */}
      <HeroBanner />

      {/* 📊 QUICK STATS */}
      <div className="reveal">
        <StatsSection />
      </div>

      {/* 📢 NOTICE BOARD */}
      <div className="reveal">
        <NoticeBoard />
      </div>

      {/* 🎯 ADMISSIONS CTA (CONVERSION SECTION) */}
      <div className="reveal">
        <AdmissionsCTA />
      </div>

      {/* 📸 CAMPUS MEMORIES */}
      <div className="reveal">
        <CampusMemories />
      </div>

      {/* 🧑‍🎓 ALUMNI */}
      <div className="reveal">
        <AlumniSection />
      </div>

      {/* 🔚 FOOTER */}
      <Footer />
    </>
  );
}
