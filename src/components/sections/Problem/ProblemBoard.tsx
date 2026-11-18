"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cx } from "@/lib/utils";
import styles from "./Problem.module.scss";

const PROBLEMS = [
  { pain: "Manual service tracking", detail: "Which car is in which bay? Ask the floor.", fix: "Live job board with status per bay" },
  { pain: "Scattered payment records", detail: "Cash in a drawer, UPI on a phone, card on a slip.", fix: "Every payment in one ledger, by method" },
  { pain: "Customer dues", detail: "“Pay next time” — and nobody wrote it down.", fix: "Running balance + reminders per customer" },
  { pain: "Employee salary records", detail: "Advances remembered, not recorded.", fix: "Salary, credit & transfer refs per employee" },
  { pain: "Attendance tracking", detail: "A register that's half-filled by the 20th.", fix: "Daily marking with monthly summaries" },
  { pain: "Expense management", detail: "Shampoo, wax, power bill — on loose receipts.", fix: "Categorised expenses, daily & monthly" },
  { pain: "Multiple spreadsheets", detail: "Five files, three versions, one truth missing.", fix: "One system of record for the business" },
  { pain: "Unclear profitability", detail: "Revenue looks good. Profit? Unknown.", fix: "Income vs expense, net margin, in real time" },
];

export function ProblemBoard() {
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const chaos = Math.round(100 - (solved.size / PROBLEMS.length) * 100);
  const allSolved = solved.size === PROBLEMS.length;

  const toggle = (i: number) =>
    setSolved((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={styles.board}>
      <div className={styles.meter}>
        <div className={styles.meterHead}>
          <span>Operational chaos</span>
          <output className={cx(styles.meterValue, chaos === 0 && styles.calm)} aria-live="polite">
            {chaos}%
          </output>
        </div>
        <div className={styles.meterTrack} aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className={i < Math.round((chaos / 100) * 24) ? styles.on : undefined} />
          ))}
        </div>
        <div className={styles.meterFoot}>
          <span>Tap a problem to see the fix</span>
          <button
            type="button"
            className={styles.solveAll}
            onClick={() => setSolved(allSolved ? new Set() : new Set(PROBLEMS.map((_, i) => i)))}
          >
            {allSolved ? "Reset" : "Fix all with WashFlow"}
          </button>
        </div>
      </div>

      <ul className={styles.list}>
        {PROBLEMS.map((p, i) => {
          const on = solved.has(i);
          return (
            <li key={p.pain}>
              <button
                type="button"
                className={cx(styles.row, on && styles.solved)}
                aria-pressed={on}
                onClick={() => toggle(i)}
              >
                <span className={styles.rowIdx} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.rowText}>
                  <span className={styles.pain}>{p.pain}</span>
                  <motion.span
                    key={on ? "fix" : "pain"}
                    className={styles.detail}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {on ? `→ ${p.fix}` : p.detail}
                  </motion.span>
                </span>
                <span className={styles.rowIcon} aria-hidden="true">
                  {on ? <Check size={16} strokeWidth={2.6} /> : <X size={16} />}
                </span>
                <span className="sr-only">{on ? "Solved" : "Unsolved"}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
