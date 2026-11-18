"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  Car,
  CreditCard,
  LayoutGrid,
  Receipt,
  Search,
  Settings,
  Users,
  UserCog,
  Wallet,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { OVERVIEW, TRANSACTIONS, JOBS, REVENUE_WEEK, EMPLOYEES } from "@/lib/mockData";
import { formatINR, cx } from "@/lib/utils";
import { StatusChip } from "@/components/ui/StatusChip/StatusChip";
import { RevenueArea, Legend } from "@/components/charts";
import styles from "./Dashboard.module.scss";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "jobs", label: "Wash jobs" },
  { id: "transactions", label: "Transactions" },
] as const;
type Tab = (typeof TABS)[number]["id"];

const NAV = [
  { icon: LayoutGrid, label: "Dashboard", tab: "overview" as Tab },
  { icon: Car, label: "Wash jobs", tab: "jobs" as Tab },
  { icon: Receipt, label: "Transactions", tab: "transactions" as Tab },
  { icon: Users, label: "Customers" },
  { icon: Car, label: "Vehicles" },
  { icon: Wallet, label: "Expenses" },
  { icon: UserCog, label: "Employees" },
  { icon: CalendarCheck, label: "Attendance" },
  { icon: CreditCard, label: "Salary" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

const KPIS = [
  { label: "Total revenue", value: formatINR(OVERVIEW.revenue), delta: "+12.4%", up: true, accent: true },
  { label: "Washes today", value: String(OVERVIEW.washes), delta: "+9 vs avg", up: true },
  { label: "Pending payments", value: formatINR(OVERVIEW.pending), delta: "7 customers", up: false },
  { label: "Expenses", value: formatINR(OVERVIEW.expenses), delta: "−3.1%", up: true },
  { label: "Net income", value: formatINR(OVERVIEW.net), delta: "78.4% margin", up: true },
];

export function Dashboard() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className={styles.app}>
      <aside className={styles.side} aria-label="Demo app navigation">
        <div className={styles.org}>
          <span className={styles.orgMark}>SS</span>
          <span>
            <b>Sparkle Studio</b>
            <small>Kochi · 4 bays</small>
          </span>
        </div>
        <ul className={styles.nav}>
          {NAV.map((n) => {
            const active = n.tab === tab && (n.label === "Dashboard" || n.tab !== "overview");
            return (
              <li key={n.label}>
                {n.tab ? (
                  <button type="button" className={cx(styles.navItem, active && styles.navActive)} onClick={() => setTab(n.tab!)} tabIndex={-1}>
                    <n.icon size={15} aria-hidden="true" />
                    {n.label}
                  </button>
                ) : (
                  <span className={styles.navItem}>
                    <n.icon size={15} aria-hidden="true" />
                    {n.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      <div className={styles.main}>
        <div className={styles.top}>
          <div>
            <p className={styles.crumb}>Sunday, 16 Nov · Demo workspace</p>
            <p className={styles.h}>Good evening, Rahul</p>
          </div>
          <div className={styles.topRight}>
            <span className={styles.search}>
              <Search size={13} aria-hidden="true" /> Search vehicle, customer…
            </span>
            <span className={styles.bell}>
              <Bell size={15} aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Dashboard views">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`dash-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="dash-panel"
              className={cx(styles.tab, tab === t.id && styles.tabActive)}
              onClick={() => setTab(t.id)}
            >
              {tab === t.id && <motion.span layoutId="dash-tab" className={styles.tabBg} transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div id="dash-panel" role="tabpanel" aria-labelledby={`dash-tab-${tab}`} className={styles.panelArea}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab === "overview" && <Overview />}
              {tab === "jobs" && <Jobs />}
              {tab === "transactions" && <Transactions />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Overview() {
  const totalWeek = REVENUE_WEEK.reduce((a, d) => a + d.revenue, 0);
  return (
    <>
      <div className={styles.kpis}>
        {KPIS.map((k) => (
          <div key={k.label} className={cx(styles.kpi, k.accent && styles.kpiAccent)}>
            <span className={styles.kLabel}>{k.label}</span>
            <span className={styles.kValue}>{k.value}</span>
            <span className={cx(styles.kDelta, !k.up && styles.kWarn)}>
              {k.up ? <TrendingUp size={11} aria-hidden="true" /> : <TrendingDown size={11} aria-hidden="true" />}
              {k.delta}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        <div className={cx(styles.card, styles.chartCard)}>
          <div className={styles.cardHead}>
            <div>
              <span className={styles.cardTitle}>Revenue · last 7 days</span>
              <p className={styles.big}>{formatINR(totalWeek)}</p>
            </div>
            <Legend items={[{ label: "Revenue", color: "c1" }, { label: "Expenses", color: "c2" }]} />
          </div>
          <div className={styles.chart}>
            <RevenueArea data={REVENUE_WEEK} />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>Service status</span>
            <span className={styles.muted}>4 bays</span>
          </div>
          <ul className={styles.jobsMini}>
            {JOBS.slice(0, 4).map((j) => (
              <li key={j.vehicle}>
                <span className={styles.bay}>{j.bay}</span>
                <span className={styles.jm}>
                  <b>{j.model}</b>
                  <small>{j.service}</small>
                </span>
                <StatusChip status={j.status} />
              </li>
            ))}
          </ul>
        </div>

        <div className={cx(styles.card, styles.txCard)}>
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>Recent transactions</span>
            <span className={styles.muted}>Today</span>
          </div>
          <TxTable rows={TRANSACTIONS.slice(0, 4)} compact />
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>Employee activity</span>
          </div>
          <ul className={styles.staff}>
            {EMPLOYEES.slice(0, 3).map((e, i) => (
              <li key={e.name}>
                <span className={styles.avatar}>{e.name.split(" ").map((p) => p[0]).join("")}</span>
                <span className={styles.jm}>
                  <b>{e.name}</b>
                  <small>{[18, 11, 14][i]} washes today</small>
                </span>
                <span className={styles.on}>On shift</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>Customer insights</span>
          </div>
          <dl className={styles.insights}>
            <div>
              <dt>Returning</dt>
              <dd>72%</dd>
            </div>
            <div>
              <dt>New today</dt>
              <dd>14</dd>
            </div>
            <div>
              <dt>Avg. ticket</dt>
              <dd>{formatINR(672)}</dd>
            </div>
            <div>
              <dt>With dues</dt>
              <dd className={styles.warnText}>7</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

function Jobs() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.cardTitle}>Live wash jobs</span>
        <span className={styles.muted}>{JOBS.length} active · 121 completed</span>
      </div>
      <div className={styles.table} role="table" aria-label="Demo wash jobs">
        <div className={cx(styles.tr, styles.th, styles.jobsCols)} role="row">
          <span role="columnheader">Bay</span>
          <span role="columnheader">Vehicle</span>
          <span role="columnheader">Service</span>
          <span role="columnheader">Staff</span>
          <span role="columnheader">Progress</span>
          <span role="columnheader">Status</span>
        </div>
        {JOBS.map((j) => (
          <div key={j.vehicle} className={cx(styles.tr, styles.jobsCols)} role="row">
            <span role="cell" className={styles.bay}>{j.bay}</span>
            <span role="cell" className={styles.jm}>
              <b>{j.vehicle}</b>
              <small>{j.model}</small>
            </span>
            <span role="cell">{j.service}</span>
            <span role="cell" className={styles.muted}>{j.staff}</span>
            <span role="cell" className={styles.prog}>
              <i style={{ width: `${j.progress}%` }} />
            </span>
            <span role="cell">
              <StatusChip status={j.status} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Transactions() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.cardTitle}>All transactions · today</span>
        <span className={styles.filters}>
          {["All", "Cash", "UPI", "Card", "Bank"].map((f, i) => (
            <span key={f} className={cx(styles.filter, i === 0 && styles.filterOn)}>
              {f}
            </span>
          ))}
        </span>
      </div>
      <TxTable rows={TRANSACTIONS} />
    </div>
  );
}

function TxTable({ rows, compact }: { rows: typeof TRANSACTIONS; compact?: boolean }) {
  return (
    <div className={styles.table} role="table" aria-label="Demo transactions">
      <div className={cx(styles.tr, styles.th, compact ? styles.txColsC : styles.txCols)} role="row">
        <span role="columnheader">Customer</span>
        {!compact && <span role="columnheader">Service</span>}
        <span role="columnheader">Method</span>
        <span role="columnheader">Amount</span>
        <span role="columnheader">Status</span>
      </div>
      {rows.map((t) => (
        <div key={t.id} className={cx(styles.tr, compact ? styles.txColsC : styles.txCols)} role="row">
          <span role="cell" className={styles.jm}>
            <b>{t.name}</b>
            <small>{t.vehicle}</small>
          </span>
          {!compact && <span role="cell">{t.service}</span>}
          <span role="cell" className={styles.method}>{t.method}</span>
          <span role="cell" className={styles.amt}>{formatINR(t.amount)}</span>
          <span role="cell">
            <StatusChip status={t.status} />
          </span>
        </div>
      ))}
    </div>
  );
}
