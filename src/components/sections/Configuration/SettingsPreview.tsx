"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, BookOpen, Droplets, Landmark, Wallet } from "lucide-react";
import { DemoTag } from "@/components/mockups/Frames";
import { cx, formatINR } from "@/lib/utils";
import styles from "./Configuration.module.scss";

const TABS = [
  { id: "services", label: "Services", Icon: Droplets },
  { id: "ledgers", label: "Ledgers", Icon: BookOpen },
  { id: "banks", label: "Bank accounts", Icon: Landmark },
  { id: "payments", label: "Payments", Icon: Wallet },
  { id: "business", label: "Business", Icon: Building2 },
] as const;
type Tab = (typeof TABS)[number]["id"];

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} className={cx(styles.toggle, on && styles.toggleOn)} onClick={onChange}>
      <motion.span layout transition={{ type: "spring", stiffness: 600, damping: 34 }} />
    </button>
  );
}

export function SettingsPreview() {
  const [tab, setTab] = useState<Tab>("services");
  const [services, setServices] = useState([
    { name: "Express Exterior", time: "15 min", price: 450, on: true },
    { name: "Premium Wash", time: "30 min", price: 899, on: true },
    { name: "Ceramic Foam Wash", time: "45 min", price: 1499, on: true },
    { name: "Interior Detailing", time: "90 min", price: 2400, on: true },
    { name: "Underbody Wash", time: "20 min", price: 650, on: false },
  ]);
  const [methods, setMethods] = useState([
    { name: "Cash", on: true },
    { name: "UPI", on: true },
    { name: "Card", on: true },
    { name: "Bank transfer", on: true },
    { name: "Customer credit (ledger)", on: false },
  ]);

  return (
    <div className={styles.settings}>
      <div className={styles.sideNav} role="tablist" aria-label="Settings sections" aria-orientation="vertical">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={cx(styles.navBtn, tab === t.id && styles.navOn)}
            onClick={() => setTab(t.id)}
          >
            <t.Icon size={15} aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.pane} role="tabpanel" aria-label={TABS.find((t) => t.id === tab)?.label}>
        <div className={styles.paneHead}>
          <p className={styles.paneTitle}>{TABS.find((t) => t.id === tab)?.label}</p>
          <DemoTag />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.25 }}>
            {tab === "services" && (
              <ul className={styles.rows}>
                {services.map((s, i) => (
                  <li key={s.name} className={cx(!s.on && styles.off)}>
                    <span className={styles.rMain}>
                      <b>{s.name}</b>
                      <small>{s.time}</small>
                    </span>
                    <span className="tabular">{formatINR(s.price)}</span>
                    <Toggle
                      on={s.on}
                      label={`${s.name} active`}
                      onChange={() => setServices((all) => all.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))}
                    />
                  </li>
                ))}
              </ul>
            )}
            {tab === "ledgers" && (
              <ul className={styles.rows}>
                {[
                  ["Service income", "Income", "₹14.2L"],
                  ["Supplies & chemicals", "Expense", "₹1.18L"],
                  ["Salaries", "Expense", "₹2.48L"],
                  ["Customer receivables", "Asset", "₹46,300"],
                  ["Rent & utilities", "Expense", "₹1.59L"],
                ].map(([n, t, v]) => (
                  <li key={n}>
                    <span className={styles.rMain}>
                      <b>{n}</b>
                      <small>{t}</small>
                    </span>
                    <span className="tabular">{v}</span>
                  </li>
                ))}
              </ul>
            )}
            {tab === "banks" && (
              <div className={styles.banks}>
                {[
                  { bank: "Business current account", no: "•••• 4821", primary: true },
                  { bank: "Savings account", no: "•••• 0193", primary: false },
                ].map((b) => (
                  <div key={b.no} className={cx(styles.bankCard, b.primary && styles.bankPrimary)}>
                    <Landmark size={18} aria-hidden="true" />
                    <b>{b.bank}</b>
                    <span className="tabular">{b.no}</span>
                    {b.primary && <small>Primary · UPI settles here</small>}
                  </div>
                ))}
              </div>
            )}
            {tab === "payments" && (
              <ul className={styles.rows}>
                {methods.map((m, i) => (
                  <li key={m.name} className={cx(!m.on && styles.off)}>
                    <span className={styles.rMain}>
                      <b>{m.name}</b>
                      <small>{m.on ? "Accepted at counter" : "Disabled"}</small>
                    </span>
                    <Toggle on={m.on} label={`Accept ${m.name}`} onChange={() => setMethods((all) => all.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))} />
                  </li>
                ))}
              </ul>
            )}
            {tab === "business" && (
              <dl className={styles.biz}>
                {[
                  ["Business name", "Sparkle Studio Car Care"],
                  ["Location", "Kochi, Kerala"],
                  ["Wash bays", "4"],
                  ["Working hours", "7:00 – 21:00"],
                  ["GSTIN", "32ABCDE••••1Z5"],
                  ["Invoice prefix", "INV-"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
