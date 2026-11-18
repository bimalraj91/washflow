"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Zap } from "lucide-react";
import { EMPLOYEES } from "@/lib/mockData";
import { StatusChip } from "@/components/ui/StatusChip/StatusChip";
import { cx, formatINR } from "@/lib/utils";
import styles from "./EmployeeManagement.module.scss";

type Row = (typeof EMPLOYEES)[number];

export function Payroll() {
  const [rows, setRows] = useState<Row[]>(EMPLOYEES);
  const [running, setRunning] = useState(false);
  const pending = rows.filter((r) => r.status === "pending");
  const total = rows.reduce((a, r) => a + r.salary, 0);
  const paid = rows.filter((r) => r.status === "paid").reduce((a, r) => a + r.salary, 0);

  const run = () => {
    if (!pending.length || running) return;
    setRunning(true);
    pending.forEach((p, i) => {
      setTimeout(() => {
        setRows((rs) =>
          rs.map((r) => (r.name === p.name ? { ...r, status: "paid", date: "18 Nov", ref: `UTR 4411 0072 ${String(31 + i).padStart(4, "0")}` } : r)),
        );
        if (i === pending.length - 1) setRunning(false);
      }, 700 * (i + 1));
    });
  };

  const reset = () => setRows(EMPLOYEES);

  return (
    <div className={styles.payroll}>
      <div className={styles.pHead}>
        <div>
          <p className={styles.cardLabel}>Payroll · November</p>
          <p className={styles.pTotal}>
            <span className="tabular">{formatINR(paid)}</span>
            <small> of {formatINR(total)} paid</small>
          </p>
        </div>
        {pending.length ? (
          <button type="button" className={styles.runBtn} onClick={run} disabled={running}>
            {running ? <Loader2 size={15} className={styles.spin} aria-hidden="true" /> : <Zap size={15} aria-hidden="true" />}
            {running ? "Processing…" : `Pay ${pending.length} pending`}
          </button>
        ) : (
          <button type="button" className={styles.resetBtn} onClick={reset}>
            Reset demo
          </button>
        )}
      </div>

      <div className={styles.pBar} aria-hidden="true">
        <motion.span animate={{ width: `${(paid / total) * 100}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
      </div>

      <div className={styles.pTable} role="table" aria-label="Demo payroll">
        <div className={cx(styles.pRow, styles.pTh)} role="row">
          <span role="columnheader">Employee</span>
          <span role="columnheader">Salary</span>
          <span role="columnheader" className={styles.hideSm}>Paid on</span>
          <span role="columnheader" className={styles.hideSm}>Transfer ref</span>
          <span role="columnheader">Status</span>
        </div>
        {rows.map((r) => (
          <motion.div key={r.name} layout className={styles.pRow} role="row">
            <span role="cell" className={styles.pName}>
              <b>{r.name}</b>
              <small>
                {r.role}
                {r.credit ? ` · ₹${r.credit.toLocaleString("en-IN")} advance` : ""}
              </small>
            </span>
            <span role="cell" className="tabular">{formatINR(r.salary)}</span>
            <span role="cell" className={cx(styles.muted, styles.hideSm)}>{r.date}</span>
            <span role="cell" className={cx(styles.ref, styles.hideSm)}>{r.ref}</span>
            <span role="cell">
              <motion.span key={r.status} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ display: "inline-flex" }}>
                <StatusChip status={r.status} />
              </motion.span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
