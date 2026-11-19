"use client";

import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/animations/gsap";

/**
 * Page-level scroll choreography so sections can stay Server Components.
 *
 *  data-reveal            → element rises + fades in when it enters
 *  data-reveal="fade"     → opacity only
 *  data-reveal-stagger    → its direct children reveal in sequence
 *  data-parallax="0.15"   → drifts vertically with scroll (desktop only)
 *
 * Elements already on screen at hydration are left alone (no flash).
 */
export function MotionController() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      const vh = window.innerHeight;
      const belowFold = (el: Element) => el.getBoundingClientRect().top > vh * 0.92;

      const singles = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(belowFold);
      singles.forEach((el) =>
        gsap.set(el, { autoAlpha: 0, y: el.dataset.reveal === "fade" ? 0 : 44 }),
      );
      ScrollTrigger.batch(singles, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.1, overwrite: true }),
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((parent) => {
        if (!belowFold(parent)) return;
        const kids = Array.from(parent.children);
        gsap.set(kids, { autoAlpha: 0, y: 24 });
        ScrollTrigger.create({
          trigger: parent,
          start: "top 85%",
          once: true,
          onEnter: () => gsap.to(kids, { autoAlpha: 1, y: 0, stagger: 0.09, duration: 1.2 }),
        });
      });
    });

    mm.add(MQ.desktop, () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.15");
        gsap.fromTo(
          el,
          { yPercent: speed * -50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    // Fonts and images can shift layout after first measure.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  });

  return null;
}
