"use client";

import { gsap, useGSAP, MQ } from "@/lib/animations/gsap";

/** Desktop: pin the section and translate the panel track horizontally. */
export function BenefitsMotion() {
  useGSAP(() => {
    const pin = document.querySelector<HTMLElement>("[data-benefits-pin]");
    const track = document.querySelector<HTMLElement>("[data-benefits-track]");
    if (!pin || !track) return;
    const mm = gsap.matchMedia();

    mm.add(MQ.desktop, () => {
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  });

  return null;
}
