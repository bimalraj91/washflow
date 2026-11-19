"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Pending } from "@/lib/auth";

const noop = () => () => {};

function read(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Reads the sign-up hand-off from sessionStorage without setState-in-effect. `ready` is false during SSR. */
export function usePending() {
  const raw = useSyncExternalStore(noop, () => read("wf-signup-pending") ?? "", () => null);
  const verified = useSyncExternalStore(noop, () => read("wf-signup-verified") === "1", () => false);
  const data = useMemo<Pending | null>(() => {
    try {
      return raw ? (JSON.parse(raw) as Pending) : null;
    } catch {
      return null;
    }
  }, [raw]);
  return { ready: raw !== null, data, verified };
}
