"use client";

import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/animations/gsap";
import { splitWords } from "@/lib/animations/splitWords";

/**
 * Page-level scroll choreography so sections can stay Server Components.
 *
 *  data-reveal            → element rises + fades in when it enters
 *  data-reveal="fade"     → opacity only
 *  data-reveal-stagger    → its direct children reveal in sequence
 *  data-split             → headline words rise through a mask, staggered
 *  data-mask              → block opens from an inset clip, content settles in
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

      // Headlines: words rise through a clip mask. Reverted on cleanup so the
      // original markup (and a11y label) is always restored.
      const reverts: Array<() => void> = [];
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const { words, revert } = splitWords(el);
        reverts.push(revert);
        if (!belowFold(el)) return; // already on screen at load: leave in place
        gsap.set(words, { yPercent: 115, rotate: 3 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.055, ease: "expo.out" }),
        });
      });

      // Mask reveals: an inset window opens to full size while the content
      // inside settles from slightly zoomed — product shots "develop" in.
      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
        if (!belowFold(el)) return;
        const inner = el.firstElementChild as HTMLElement | null;
        gsap.set(el, { clipPath: "inset(10% 5% 10% 5% round 24px)" });
        if (inner) gsap.set(inner, { scale: 1.12, transformOrigin: "50% 50%" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          defaults: { duration: 1.7, ease: "expo.out" },
          onComplete: () => {
            gsap.set(el, { clearProps: "clipPath" });
            if (inner) gsap.set(inner, { clearProps: "scale,transformOrigin" });
          },
        });
        tl.to(el, { clipPath: "inset(0% 0% 0% 0% round 0px)" }, 0);
        if (inner) tl.to(inner, { scale: 1 }, 0);
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

      return () => reverts.forEach((r) => r());
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
