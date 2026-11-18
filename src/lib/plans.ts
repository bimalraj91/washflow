// Subscription plans. Prices are placeholders until the business confirms them.

export type Plan = {
  id: "starter" | "growth" | "pro";
  name: string;
  tagline: string;
  monthly: number;
  /** Per-month price when billed yearly (2 months free). */
  yearly: number;
  scale: string[];
  features: string[];
  cta: string;
  featured?: boolean;
};

const yearly = (m: number) => Math.round((m * 10) / 12);

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For a single-bay wash getting off paper.",
    monthly: 1499,
    yearly: yearly(1499),
    scale: ["1 location", "Up to 2 bays", "3 staff logins"],
    features: [
      "Wash & service job tracking",
      "Transactions by Cash, UPI, Card, Bank",
      "Customer & vehicle profiles",
      "Customer dues & ledger",
      "Daily summary reports",
    ],
    cta: "Start with Starter",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For busy multi-bay washes and detailing studios.",
    monthly: 2999,
    yearly: yearly(2999),
    scale: ["1 location", "Up to 6 bays", "10 staff logins"],
    features: [
      "Everything in Starter",
      "Invoice sharing & payment reminders",
      "Bulk payments against dues",
      "Expense management",
      "Employees, attendance & salary",
      "All 8 reports & analytics",
    ],
    cta: "Choose Growth",
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For multi-location operators and fleet washing.",
    monthly: 5999,
    yearly: yearly(5999),
    scale: ["Up to 5 locations", "Unlimited bays", "Unlimited staff logins"],
    features: [
      "Everything in Growth",
      "Multi-location dashboard",
      "Ledger & bank account configuration",
      "Report exports",
      "Dedicated onboarding manager",
      "Priority phone support",
    ],
    cta: "Talk to us about Pro",
  },
];

export const PLAN_MATRIX: Array<{ feature: string; values: Array<boolean | string> }> = [
  { feature: "Locations", values: ["1", "1", "Up to 5"] },
  { feature: "Wash bays", values: ["2", "6", "Unlimited"] },
  { feature: "Staff logins", values: ["3", "10", "Unlimited"] },
  { feature: "Wash & service tracking", values: [true, true, true] },
  { feature: "Transactions & payment methods", values: [true, true, true] },
  { feature: "Customer & vehicle management", values: [true, true, true] },
  { feature: "Customer ledger & dues", values: [true, true, true] },
  { feature: "Invoice sharing & reminders", values: [false, true, true] },
  { feature: "Bulk payments", values: [false, true, true] },
  { feature: "Expense management", values: [false, true, true] },
  { feature: "Employees, attendance & salary", values: [false, true, true] },
  { feature: "Reports", values: ["Daily summary", "All 8 reports", "All 8 + exports"] },
  { feature: "Multi-location dashboard", values: [false, false, true] },
  { feature: "Support", values: ["Email", "Priority email & chat", "Dedicated manager + phone"] },
];
