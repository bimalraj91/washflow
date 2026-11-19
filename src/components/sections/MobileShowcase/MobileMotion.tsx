"use client";

import { gsap, useGSAP, MQ } from "@/lib/animations/gsap";

/**
 * Desktop only: the three phones start stacked and rotated, then fan out in 3D
 * as the section scrolls through, and lean toward the cursor afterwards.
 * Mobile gets a plain swipeable row (CSS scroll-snap).
 */
export function MobileMotion() {
  useGSAP(() => {
    const stage = document.querySelector<HTMLElement>("[data-mobile-stage]");
    if (!stage) return;
    const mm = gsap.matchMedia();

    mm.add(MQ.desktop, () => {
      const left = stage.querySelector('[data-phone="left"]');
      const center = stage.querySelector('[data-phone="center"]');
      const right = stage.querySelector('[data-phone="right"]');

      // Resting fan-out pose (desktop only — mobile stays flat)
      gsap.set(stage, { transformPerspective: 1800 });
      gsap.set(left, { rotateY: 24, rotateZ: -3, z: -120, y: 40 });
      gsap.set(right, { rotateY: -24, rotateZ: 3, z: -120, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: stage, start: "top 85%", end: "center 55%", scrub: 0.8 },
      });
      tl.from(left, { xPercent: 105, rotateY: 0, rotateZ: 0, z: -200, ease: "power2.out" }, 0)
        .from(right, { xPercent: -105, rotateY: 0, rotateZ: 0, z: -200, ease: "power2.out" }, 0)
        .from(center, { y: 120, rotateX: 18, ease: "power2.out" }, 0);

      const tiltTo = gsap.quickTo(stage, "rotateY", { duration: 1, ease: "power3" });
      const tiltX = gsap.quickTo(stage, "rotateX", { duration: 1, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        tiltTo(((e.clientX - r.left) / r.width - 0.5) * 8);
        tiltX(-((e.clientY - r.top) / r.height - 0.5) * 5);
      };
      const leave = () => {
        tiltTo(0);
        tiltX(0);
      };
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerleave", leave);
      return () => {
        stage.removeEventListener("pointermove", move);
        stage.removeEventListener("pointerleave", leave);
      };
    });

    return () => mm.revert();
  });

  return null;
}
