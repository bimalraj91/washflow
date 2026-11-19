"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/animations/gsap";
import styles from "./FitFrame.module.scss";

type Props = {
  /** Natural width of the mockup in px. */
  width: number;
  /** Smallest scale before switching to horizontal scrolling. */
  minScale?: number;
  /** Degrees of rotateX to settle from as it scrolls in (desktop). */
  tilt?: number;
  /** Open the frame with a clipped mask reveal on first scroll-in. */
  mask?: boolean;
  /** Lean toward the cursor (desktop fine pointer). */
  pointerTilt?: boolean;
  children: ReactNode;
};

/**
 * Scales a fixed-width product mockup to its container so it reads as a real
 * screen at every size. Below `minScale` it keeps that scale and scrolls
 * horizontally instead of becoming unreadable. Optional scroll-in tilt.
 */
export function FitFrame({ width, minScale = 0.6, tilt = 0, mask, pointerTilt = true, children }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const lean = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ scale: number; h: number; scroll: boolean } | null>(null);

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const fit = o.clientWidth / width;
      const scale = Math.min(1, Math.max(fit, minScale));
      setBox({ scale, h: i.offsetHeight * scale, scroll: fit < minScale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [width, minScale]);

  useGSAP(
    () => {
      if (!tilt || !outer.current) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        gsap.fromTo(
          outer.current,
          { rotateX: tilt, y: 60, scale: 0.94 },
          {
            rotateX: 0,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: outer.current, start: "top 95%", end: "top 25%", scrub: 0.6 },
          },
        );
      });
    },
    { dependencies: [tilt] },
  );

  // Pointer tilt: the screen leans a few degrees toward the cursor and a soft
  // glare follows it. Runs on the inner wrapper so it composes with the
  // scroll-linked settle above (which owns the outer element).
  useGSAP(
    () => {
      const el = lean.current;
      if (!el || !pointerTilt) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.finePointer} and ${MQ.desktop}`, () => {
        const rx = gsap.quickTo(el, "rotateX", { duration: 0.9, ease: "power3" });
        const ry = gsap.quickTo(el, "rotateY", { duration: 0.9, ease: "power3" });
        gsap.set(el, { transformPerspective: 1400 });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          ry(nx * 5);
          rx(-ny * 3.5);
          el.style.setProperty("--mx", `${(nx + 0.5) * 100}%`);
          el.style.setProperty("--my", `${(ny + 0.5) * 100}%`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
          gsap.set(el, { clearProps: "transform" });
        };
      });
      return () => mm.revert();
    },
    { dependencies: [pointerTilt] },
  );

  return (
    <div className={styles.persp} data-mask={mask ? "" : undefined}>
      <div ref={lean} className={styles.lean}>
      <div
        ref={outer}
        className={styles.outer}
        data-scroll={box?.scroll || undefined}
        data-lenis-prevent-wheel={box?.scroll ? "" : undefined}
        tabIndex={box?.scroll ? 0 : undefined}
        aria-label={box?.scroll ? "Product preview — scroll sideways to see more" : undefined}
        role={box?.scroll ? "region" : undefined}
        style={{ height: box ? box.h : undefined }}
      >
        <div className={styles.sizer} style={box ? { width: width * box.scale, height: box.h } : undefined}>
          <div
            ref={inner}
            className={styles.inner}
            style={{ width, transform: box ? `scale(${box.scale})` : undefined }}
          >
            {children}
          </div>
        </div>
      </div>
      </div>
      {box?.scroll && (
        <p className={styles.hint} aria-hidden="true">
          Swipe to explore the dashboard →
        </p>
      )}
    </div>
  );
}
