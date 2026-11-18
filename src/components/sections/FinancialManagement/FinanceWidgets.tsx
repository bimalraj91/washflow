"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Banknote, CreditCard, Landmark, Smartphone } from "lucide-react";
import { TRANSACTIONS, MONTHLY, REVENUE_WEEK, EXPENSE_SPLIT, type PayMethod } from "@/lib/mockData";
import { StatusChip } from "@/components/ui/StatusChip/StatusChip";
import { DemoTag } from "@/components/mockups/Frames";
import { IncomeExpenseBars, Legend } from "@/components/charts";
import { cx, formatINR } from "@/lib/utils";
import styles from "./FinancialManagement.module.scss";

const METHOD_ICON: Record<PayMethod, typeof Banknote> = { Cash: Banknote, UPI: Smartphone, Card: CreditCard, Bank: Landmark };
const FILTERS = ["All", "Cash", "UPI", "Card", "Bank"] as const;

const INCOMING = [
  { id: "TXN-24817", name: "Meera Pillai", vehicle: "KL 08 AZ 2210", service: "Foam Wash", amount: 699, method: "UPI" as PayMethod, status: "paid" as const, time: "10:51" },
  { id: "TXN-24818", name: "Kiran Joseph", vehicle: "KL 07 BB 9034", service: "Interior Vacuum", amount: 350, method: "Cash" as PayMethod, status: "paid" as const, time: "10:58" },
  { id: "TXN-24819", name: "Urban Rides", vehicle: "KL 07 UR 0042", service: "Fleet Wash × 4", amount: 2400, method: "Bank" as PayMethod, status: "pending" as const, time: "11:06" },
  { id: "TXN-24820", name: "Anjali R", vehicle: "KL 05 CT 7781", service: "Premium Wash", amount: 899, method: "Card" as PayMethod, status: "paid" as const, time: "11:12" },
];

export function TransactionFeed() {
  const [rows, setRows] = useState(TRANSACTIONS.slice(0, 5));
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  // A new demo payment lands every few seconds while visible.
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const t = setInterval(() => {
      const next = { ...INCOMING[i % INCOMING.length], id: `${INCOMING[i % INCOMING.length].id}-${i}` };
      i++;
      setRows((r) => [next, ...r].slice(0, 5));
    }, 3200);
    return () => clearInterval(t);
  }, [inView]);

  const visible = filter === "All" ? rows : rows.filter((r) => r.method === filter);
  const total = rows.filter((r) => r.status === "paid").reduce((a, r) => a + r.amount, 0);

  return (
    <div ref={ref} className={styles.feed}>
      <div className={styles.feedHead}>
        <div>
          <p className={styles.panelLabel}>Today&apos;s transactions</p>
          <p className={styles.feedTotal}>
            {formatINR(total)} <span>collected</span>
          </p>
        </div>
        <DemoTag />
      </div>

      <div className={styles.filters} role="group" aria-label="Filter by payment method">
        {FILTERS.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} className={cx(styles.filter, filter === f && styles.filterOn)} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <ul className={styles.rows}>
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((r) => {
            const Icon = METHOD_ICON[r.method];
            return (
              <motion.li
                key={r.id}
                layout
                initial={{ opacity: 0, y: -16, backgroundColor: "rgba(199,255,69,0.08)" }}
                animate={{ opacity: 1, y: 0, backgroundColor: "rgba(199,255,69,0)" }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], backgroundColor: { duration: 1.6 } }}
                className={styles.row}
              >
                <span className={styles.mIcon} aria-hidden="true">
                  <Icon size={15} />
                </span>
                <span className={styles.rMain}>
                  <b>{r.name}</b>
                  <small>
                    {r.service} · {r.method}
                  </small>
                </span>
                <span className={styles.rRight}>
                  <b className="tabular">{formatINR(r.amount)}</b>
                  <StatusChip status={r.status} />
                </span>
              </motion.li>
            );
          })}
        </AnimatePresence>
        {visible.length === 0 && <li className={styles.empty}>No {filter} payments yet today.</li>}
      </ul>
    </div>
  );
}

export function IncomeExpense() {
  const [range, setRange] = useState<"daily" | "monthly">("monthly");
  const data =
    range === "monthly"
      ? MONTHLY
      : REVENUE_WEEK.map((d) => ({ day: d.day, income: d.revenue, expense: d.expenses }));
  const income = data.reduce((a, d) => a + d.income, 0);
  const expense = data.reduce((a, d) => a + d.expense, 0);
  const maxSplit = Math.max(...EXPENSE_SPLIT.map((e) => e.value));

  return (
    <div className={styles.chartPanel}>
      <div className={styles.chartHead}>
        <div>
          <p className={styles.panelLabel}>Income vs expense</p>
          <p className={styles.chartSub}>{range === "monthly" ? "Last 6 months" : "Last 7 days"}</p>
        </div>
        <div className={styles.seg} role="group" aria-label="Time range">
          {(["daily", "monthly"] as const).map((r) => (
            <button key={r} type="button" aria-pressed={range === r} className={cx(styles.segBtn, range === r && styles.segOn)} onClick={() => setRange(r)}>
              {r === "daily" ? "Daily" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.summary}>
        <div>
          <span>Income</span>
          <b className="tabular">{formatINR(income)}</b>
        </div>
        <div>
          <span>Expense</span>
          <b className="tabular">{formatINR(expense)}</b>
        </div>
        <div>
          <span>Net</span>
          <b className={cx("tabular", styles.net)}>{formatINR(income - expense)}</b>
        </div>
      </div>

      <Legend items={[{ label: "Income", color: "c1" }, { label: "Expense", color: "c2" }]} />
      <div className={styles.chartBox}>
        <IncomeExpenseBars key={range} data={data} xKey={range === "monthly" ? "month" : "day"} />
      </div>

      <div className={styles.split}>
        <p className={styles.panelLabel}>Expenses by category · November</p>
        <ul>
          {EXPENSE_SPLIT.map((e) => (
            <li key={e.name}>
              <span>{e.name}</span>
              <span className={styles.splitBar} aria-hidden="true">
                <i style={{ width: `${(e.value / maxSplit) * 100}%` }} />
              </span>
              <b className="tabular">{formatINR(e.value)}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
