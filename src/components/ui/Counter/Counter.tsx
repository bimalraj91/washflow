"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { formatINR } from "@/lib/utils";

type Props = { value: number; currency?: boolean; prefix?: string; suffix?: string; duration?: number; className?: string };

/**
 * Counts up once when scrolled into view. The final value is server-rendered
 * so it is correct for crawlers, screen readers and reduced-motion users.
 */
export function Counter({ value, currency, prefix = "", suffix = "", duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => `${prefix}${currency ? formatINR(n) : Math.round(n).toLocaleString("en-IN")}${suffix}`;

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const state = { n: 0 };
      el.textContent = fmt(0);
      gsap.to(state, {
        n: value,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = fmt(state.n);
        },
        onComplete: () => {
          el.textContent = fmt(value);
        },
      });
      return () => {
        el.textContent = fmt(value);
      };
    });
  });

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {fmt(value)}
    </span>
  );
}
