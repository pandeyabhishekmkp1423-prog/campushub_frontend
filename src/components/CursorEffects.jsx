import { useEffect } from "react";

export default function CursorEffects() {
  useEffect(() => {
    // Disable on touch / mobile devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const cursor = document.createElement("div");
    const aura = document.createElement("div");

    cursor.className = "cursor-dot";
    aura.className = "cursor-aura";

    document.body.appendChild(cursor);
    document.body.appendChild(aura);

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let auraX = 0;
    let auraY = 0;

    const speedDot = 0.35;
    const speedAura = 0.15;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      dotX += (mouseX - dotX) * speedDot;
      dotY += (mouseY - dotY) * speedDot;

      auraX += (mouseX - auraX) * speedAura;
      auraY += (mouseY - auraY) * speedAura;

      cursor.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      cursor.remove();
      aura.remove();
    };
  }, []);

  return null;
}
