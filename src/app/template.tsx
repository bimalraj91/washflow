"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useLenis } from "@/lib/animations/lenis";

// Module scope survives client-side navigations but not a full page load, so
// the first paint is never delayed — only later route changes animate.
let navigated = false;

/**
 * Re-mounts on every route change: the incoming page rises and fades in, and
 * Lenis snaps to the top so smooth-scroll state never carries over.
 */
export default function Template({ children }: { children: ReactNode }) {
  const lenis = useLenis();
  const [animate] = useState(() => navigated);

  useEffect(() => {
    if (navigated) lenis?.scrollTo(0, { immediate: true, force: true });
    navigated = true;
  }, [lenis]);

  return <div className={animate ? "page-in" : undefined}>{children}</div>;
}
