import { ArrowUpRight } from "lucide-react";
import { Counter } from "@/components/ui/Counter/Counter";
import { DemoTag } from "@/components/mockups/Frames";
import { NetLine } from "@/components/charts";
import { MONTHLY } from "@/lib/mockData";
import styles from "./Analytics.module.scss";

const REPORTS = [
  { name: "Transaction report", desc: "Every payment, by date, method and status" },
  { name: "Ledger report", desc: "Customer and business ledgers, debit and credit" },
  { name: "Revenue report", desc: "Service income by day, week and month" },
  { name: "Expense report", desc: "Spend by category with period comparison" },
  { name: "Service report", desc: "Which packages sell, and how often" },
  { name: "Salary report", desc: "Payroll, advances and transfer history" },
  { name: "Customer dues", desc: "Who owes what, and for how long" },
  { name: "Financial overview", desc: "Income, expense and net, side by side" },
];

const NET = MONTHLY.map((m) => ({ month: m.month, net: m.income - m.expense }));

export function Analytics() {
  return (
    <section id="insights" className={styles.section} aria-labelledby="insights-title">
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className={styles.eyebrow} data-reveal="fade">
              <span>08</span> Reports & analytics
            </p>
            <h2 id="insights-title" className={styles.title} data-reveal>
              Decisions, <em>not</em> guesswork.
            </h2>
          </div>
          <p className={styles.intro} data-reveal>
            Eight ready-made reports turn daily operations into a clear financial picture — so you know which services
            earn, where money goes and what is still owed.
          </p>
        </div>

        <div className={styles.stats} data-reveal-stagger>
          <div className={styles.stat}>
            <span className={styles.sLabel}>Net income · November</span>
            <Counter value={1394000} currency className={styles.sValue} />
            <span className={styles.sNote}>Demo figure</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.sLabel}>Washes this month</span>
            <Counter value={3482} className={styles.sValue} />
            <span className={styles.sNote}>Demo figure</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.sLabel}>Net margin</span>
            <Counter value={71} suffix="%" className={styles.sValue} />
            <span className={styles.sNote}>Demo figure</span>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.chartCard} data-reveal>
            <div className={styles.cTop}>
              <div>
                <p className={styles.cLabel}>Net income · 6 months</p>
                <p className={styles.cSub}>Income minus expenses, per month</p>
              </div>
              <DemoTag />
            </div>
            <div className={styles.chart}>
              <NetLine data={NET} />
            </div>
          </div>

          <ol className={styles.reports} aria-label="Available reports">
            {REPORTS.map((r, i) => (
              <li key={r.name} className={styles.report} data-reveal>
                <span className={styles.rNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.rText}>
                  <span className={styles.rName}>{r.name}</span>
                  <span className={styles.rDesc}>{r.desc}</span>
                </span>
                <ArrowUpRight size={18} className={styles.rArrow} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
