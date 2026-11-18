// Demo data for product previews. None of this is real customer data.

export type JobStatus = "new" | "progress" | "waiting" | "completed";
export type PayStatus = "paid" | "pending";
export type PayMethod = "Cash" | "UPI" | "Card" | "Bank";

export const OVERVIEW = {
  revenue: 84650,
  washes: 126,
  pending: 12400,
  expenses: 18250,
  net: 66400,
};

export const REVENUE_WEEK = [
  { day: "Mon", revenue: 61200, expenses: 14800 },
  { day: "Tue", revenue: 58400, expenses: 12100 },
  { day: "Wed", revenue: 66900, expenses: 16900 },
  { day: "Thu", revenue: 71300, expenses: 13400 },
  { day: "Fri", revenue: 78850, expenses: 17600 },
  { day: "Sat", revenue: 92400, expenses: 21300 },
  { day: "Sun", revenue: 84650, expenses: 18250 },
];

export const MONTHLY = [
  { month: "Jun", income: 1640000, expense: 512000 },
  { month: "Jul", income: 1580000, expense: 498000 },
  { month: "Aug", income: 1725000, expense: 541000 },
  { month: "Sep", income: 1810000, expense: 556000 },
  { month: "Oct", income: 2045000, expense: 602000 },
  { month: "Nov", income: 1968000, expense: 574000 },
];

export const EXPENSE_SPLIT = [
  { name: "Salaries", value: 248000 },
  { name: "Supplies", value: 118000 },
  { name: "Rent", value: 95000 },
  { name: "Utilities", value: 64000 },
  { name: "Maintenance", value: 49000 },
];

export const TRANSACTIONS: Array<{
  id: string;
  name: string;
  vehicle: string;
  service: string;
  amount: number;
  method: PayMethod;
  status: PayStatus;
  time: string;
}> = [
  { id: "TXN-24816", name: "Arjun Menon", vehicle: "KL 07 CK 4821", service: "Ceramic Foam Wash", amount: 1499, method: "UPI", status: "paid", time: "10:42" },
  { id: "TXN-24815", name: "Priya Nair", vehicle: "KL 01 BX 0912", service: "Interior Detailing", amount: 2400, method: "Card", status: "paid", time: "10:18" },
  { id: "TXN-24814", name: "Rahul Varma", vehicle: "TN 22 DM 7765", service: "Express Exterior", amount: 450, method: "Cash", status: "paid", time: "09:57" },
  { id: "TXN-24813", name: "Fleetline Cabs", vehicle: "KL 07 FL 1180", service: "Fleet Wash × 6", amount: 3600, method: "Bank", status: "pending", time: "09:31" },
  { id: "TXN-24812", name: "Sneha Iyer", vehicle: "KA 05 MR 3302", service: "Premium Wash", amount: 899, method: "UPI", status: "paid", time: "09:12" },
  { id: "TXN-24811", name: "Vikram Das", vehicle: "KL 39 AB 6640", service: "Underbody Wash", amount: 650, method: "Cash", status: "pending", time: "08:48" },
];

export const JOBS: Array<{
  bay: string;
  vehicle: string;
  model: string;
  service: string;
  status: JobStatus;
  progress: number;
  staff: string;
}> = [
  { bay: "B1", vehicle: "KL 07 CK 4821", model: "Hyundai Creta", service: "Ceramic Foam Wash", status: "progress", progress: 64, staff: "Anil" },
  { bay: "B2", vehicle: "KL 01 BX 0912", model: "Toyota Fortuner", service: "Interior Detailing", status: "progress", progress: 31, staff: "Joseph" },
  { bay: "B3", vehicle: "TN 22 DM 7765", model: "Maruti Swift", service: "Express Exterior", status: "completed", progress: 100, staff: "Ravi" },
  { bay: "Q", vehicle: "KA 05 MR 3302", model: "Kia Seltos", service: "Premium Wash", status: "waiting", progress: 0, staff: "—" },
  { bay: "Q", vehicle: "KL 39 AB 6640", model: "Mahindra XUV700", service: "Underbody Wash", status: "new", progress: 0, staff: "—" },
];

export const EMPLOYEES = [
  { name: "Anil Kumar", role: "Senior Washer", salary: 18500, date: "01 Nov", ref: "UTR 4410 9921 0045", status: "paid" as PayStatus, credit: 2000 },
  { name: "Joseph Mathew", role: "Detailing Lead", salary: 24000, date: "01 Nov", ref: "UTR 4410 9921 0046", status: "paid" as PayStatus, credit: 0 },
  { name: "Ravi Shankar", role: "Washer", salary: 15000, date: "01 Nov", ref: "UTR 4410 9921 0047", status: "paid" as PayStatus, credit: 1500 },
  { name: "Fathima K", role: "Front Desk", salary: 16500, date: "—", ref: "Awaiting transfer", status: "pending" as PayStatus, credit: 0 },
  { name: "Suresh Babu", role: "Washer", salary: 15000, date: "—", ref: "Awaiting transfer", status: "pending" as PayStatus, credit: 500 },
];

// 30-day attendance grid: P present, A absent, H half day, O weekly off
export const ATTENDANCE: Record<string, string> = {
  "Anil Kumar":    "PPPPPOPPPPPPOPPPHPPOPPPPPPOPPP",
  "Joseph Mathew": "PPPPPOPPPPAPOPPPPPPOPPPPPPOPPP",
  "Ravi Shankar":  "PPHPPOPPPPPPOPPPPPPOPAPPPPOPPP",
  "Fathima K":     "PPPPPOPPPPPPOPPPPPPOPPPPHPOPPP",
  "Suresh Babu":   "PAPPPOPPPPPPOPPPPPPOPPPPPPOPPA",
};

export const VEHICLE = {
  reg: "KL 07 CK 4821",
  model: "Hyundai Creta SX(O)",
  type: "SUV · Petrol",
  colour: "Abyss Black",
  owner: "Arjun Menon",
  phone: "+91 98•••• 4821",
  washes: 38,
  lifetime: 41850,
  history: [
    { date: "18 Nov", service: "Ceramic Foam Wash", amount: 1499, status: "paid" as PayStatus },
    { date: "04 Nov", service: "Premium Wash", amount: 899, status: "paid" as PayStatus },
    { date: "21 Oct", service: "Interior Detailing", amount: 2400, status: "pending" as PayStatus },
    { date: "07 Oct", service: "Express Exterior", amount: 450, status: "paid" as PayStatus },
  ],
};

export const CUSTOMER = {
  name: "Arjun Menon",
  since: "Customer since Mar 2024",
  phone: "+91 98•••• 4821",
  email: "arjun.m•••@mail.com",
  vehicles: ["KL 07 CK 4821", "KL 07 DF 1190"],
  due: 3299,
  ledger: [
    { date: "21 Oct", label: "Interior Detailing", debit: 2400, credit: 0 },
    { date: "29 Oct", label: "Express Exterior · DF 1190", debit: 450, credit: 0 },
    { date: "02 Nov", label: "UPI payment", debit: 0, credit: 450 },
    { date: "12 Nov", label: "Premium Wash · DF 1190", debit: 899, credit: 0 },
  ],
};
