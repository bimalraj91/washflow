"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

const AUTH = ["/sign-in", "/sign-up"];

/** Hides marketing chrome (navbar, footer) on full-screen auth routes. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const path = usePathname() ?? "";
  if (AUTH.some((p) => path === p || path.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
