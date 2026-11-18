export const SITE = {
  name: "WashFlow",
  legalName: "WashFlow Technologies",
  tagline: "Car wash management software",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://washflow.app",
  email: "hello@washflow.app",
  locale: "en_IN",
  description:
    "WashFlow is all-in-one car wash management software to track washes and services, billing, customer dues, vehicles, employees, attendance, salary, expenses and reports — in one system.",
} as const;

export const NAV_LINKS = [
  { label: "Platform", href: "/#platform", id: "platform" },
  { label: "Features", href: "/#features", id: "features" },
  { label: "Solutions", href: "/#solutions", id: "solutions" },
  { label: "Insights", href: "/#insights", id: "insights" },
  { label: "Pricing", href: "/#pricing", id: "pricing" },
] as const;

export const CAPABILITIES = [
  "Wash Management",
  "Customer Control",
  "Vehicle Tracking",
  "Smart Billing",
  "Team Management",
  "Business Insights",
  "Financial Control",
] as const;

export const FAQS = [
  {
    q: "What is car wash management software?",
    a: "Car wash management software is a single system that replaces notebooks and spreadsheets for running a car wash. WashFlow records every wash and service, the vehicle and customer it belongs to, how it was paid, what you spent, what your team earned and how the business is performing — so the numbers always match the work done.",
  },
  {
    q: "How much does WashFlow cost?",
    a: "There are three subscription plans — Starter, Growth and Pro — sized by locations, wash bays and staff logins. Yearly billing includes two months free, and there is no setup fee.",
  },
  {
    q: "Can I track daily washes?",
    a: "Yes. Every job is created with a vehicle, service and price, then moves through statuses such as New, In Progress, Waiting and Completed. Your dashboard shows today's wash count, service income and anything still pending payment.",
  },
  {
    q: "Can I manage customer vehicles?",
    a: "Yes. Each vehicle has its own profile with registration number, vehicle type and owner, plus its complete wash, service and payment history. A customer can have any number of vehicles linked to them.",
  },
  {
    q: "Can I track customer pending payments?",
    a: "Yes. WashFlow keeps a running ledger for every customer, highlights who has an outstanding balance, and lets you record a single bulk payment against several unpaid washes at once.",
  },
  {
    q: "Can I generate and share invoices?",
    a: "Yes. Invoices are created from completed jobs and can be shared with the customer, along with payment reminders for amounts that are still due.",
  },
  {
    q: "Can I manage employee salaries?",
    a: "Yes. Record salary amounts, payment dates, transfer references and status for every employee, and track advances or credit taken against salary.",
  },
  {
    q: "Can I track attendance?",
    a: "Yes. Mark daily attendance for your team and review monthly summaries and attendance reports for each employee.",
  },
  {
    q: "Can I manage business expenses?",
    a: "Yes. Record expenses by category — supplies, utilities, rent, maintenance and more — and review daily and monthly summaries alongside your income.",
  },
  {
    q: "Can I view income and expense reports?",
    a: "Yes. Reports cover transactions, ledgers, revenue, expenses, services, salary and customer dues, with an income versus expense overview of the business.",
  },
  {
    q: "Can I manage multiple payment methods?",
    a: "Yes. Cash, UPI, card and bank transfers are recorded separately, so you can filter transactions by method and reconcile against your bank accounts.",
  },
] as const;
