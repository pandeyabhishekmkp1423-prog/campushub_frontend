import { useEffect } from "react";

import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import NoticeBoard from "../components/NoticeBoard";
import CampusMemories from "../components/CampusMemories";
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
      {/* Cursor glow (global) */}
      <CursorEffects />

      <Navbar />
      <HeroBanner />

      <div className="reveal">
        <NoticeBoard />
      </div>

      <div className="reveal">
        <CampusMemories />
      </div>

      <div className="reveal">
        <AlumniSection />
      </div>

      <Footer />
    </>
  );
}
