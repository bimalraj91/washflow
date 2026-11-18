"use client";

import { gsap, useGSAP, MQ } from "@/lib/animations/gsap";

/**
 * Hero motion that needs JS: pointer-driven depth on the floating widgets and
 * slow scroll parallax on the vehicle. The entrance itself is pure CSS so the
 * headline paints (and counts for LCP) before hydration.
 */
export function HeroMotion() {
  useGSAP(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const mm = gsap.matchMedia();

    mm.add(MQ.desktop, () => {
      const car = hero.querySelector("[data-hero-car]");
      if (car) {
        gsap.to(car, {
          yPercent: 14,
          scale: 1.04,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      }

      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", hero).map((el) => ({
        depth: parseFloat(el.dataset.depth || "0.5"),
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }),
      }));

      const move = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => {
          l.x(nx * 28 * l.depth);
          l.y(ny * 20 * l.depth);
        });
      };
      hero.addEventListener("pointermove", move);
      return () => hero.removeEventListener("pointermove", move);
    });
  });

  return null;
}
