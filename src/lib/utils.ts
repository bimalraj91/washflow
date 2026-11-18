export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** ₹84,650 — Indian digit grouping, no paise. */
export function formatINR(value: number) {
  return inr.format(value);
}

/** ₹1.2L / ₹84.6K for compact chart axes. */
export function formatINRCompact(value: number) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1).replace(/\.0$/, "")}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}
