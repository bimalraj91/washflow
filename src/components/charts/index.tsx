"use client";

import dynamic from "next/dynamic";
import styles from "./Charts.module.scss";

// Recharts is ~100 KB; split it out and render a same-height skeleton so
// nothing shifts when it arrives.
// Charts fill their parent, so the parent owns the height.
function ChartSkeleton() {
  return <div className={styles.skeleton} style={{ height: "100%" }} aria-hidden="true" />;
}

export const RevenueArea = dynamic(() => import("./Charts").then((m) => m.RevenueArea), {
  ssr: false,
  loading: ChartSkeleton,
});

export const IncomeExpenseBars = dynamic(() => import("./Charts").then((m) => m.IncomeExpenseBars), {
  ssr: false,
  loading: ChartSkeleton,
});

export const NetLine = dynamic(() => import("./Charts").then((m) => m.NetLine), {
  ssr: false,
  loading: ChartSkeleton,
});

export { Legend } from "./Legend";
