"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/animations/gsap";
import styles from "./CursorGlow.module.scss";

/** Soft lime light that trails the pointer. Desktop fine pointer only. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`${MQ.finePointer} and ${MQ.motion}`, () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" });
      const move = (e: PointerEvent) => {
        gsap.to(el, { autoAlpha: 1, duration: 0.6, overwrite: "auto" });
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("pointermove", move, { passive: true });
      return () => window.removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  });

  return <div ref={ref} className={styles.glow} aria-hidden="true" />;
}
