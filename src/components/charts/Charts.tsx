"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts";
import { formatINR, formatINRCompact } from "@/lib/utils";
import styles from "./Charts.module.scss";

// Validated pair on #141917: lime (brand) + cyan, ΔE ≥ 30 under all CVD types.
const C1 = "#C7FF45";
const C2 = "#38B6D8";
const AXIS = { fill: "#7f8983", fontSize: 11, fontFamily: "var(--font-mono)" };

type Row = Record<string, string | number>;

function ChartTooltip({ active, payload, label }: Partial<TooltipContentProps<number, string>>) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tLabel}>{label}</p>
      {payload.map((p) => (
        <p key={String(p.dataKey)} className={styles.tRow}>
          <i style={{ background: p.color }} />
          <span>{p.name}</span>
          <b>{formatINR(Number(p.value))}</b>
        </p>
      ))}
    </div>
  );
}

export function RevenueArea({ data }: { data: Row[] }) {
  return (
    <div style={{ height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 4, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={C1} stopOpacity={0.28} />
              <stop offset="1" stopColor={C1} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="day" tick={AXIS} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS} axisLine={false} tickLine={false} tickFormatter={formatINRCompact} width={52} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.2)", strokeDasharray: "3 3" }} />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke={C2}
            strokeWidth={2}
            fill="transparent"
            activeDot={{ r: 4, stroke: "#141917", strokeWidth: 2 }}
            animationDuration={1400}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke={C1}
            strokeWidth={2}
            fill="url(#revFill)"
            activeDot={{ r: 5, stroke: "#141917", strokeWidth: 2 }}
            animationDuration={1400}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function IncomeExpenseBars({ data, xKey }: { data: Row[]; xKey: string }) {
  return (
    <div style={{ height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 4, left: -8, bottom: 0 }} barGap={2} barCategoryGap="28%">
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey={xKey} tick={AXIS} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS} axisLine={false} tickLine={false} tickFormatter={formatINRCompact} width={56} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="income" name="Income" fill={C1} radius={[4, 4, 0, 0]} animationDuration={1200} />
          <Bar dataKey="expense" name="Expense" fill={C2} radius={[4, 4, 0, 0]} animationDuration={1200} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function NetLine({ data }: { data: Row[] }) {
  return (
    <div style={{ height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 4, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="netFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={C1} stopOpacity={0.22} />
              <stop offset="1" stopColor={C1} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tick={AXIS} axisLine={false} tickLine={false} />
          <YAxis hide domain={["dataMin - 100000", "dataMax + 100000"]} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.2)", strokeDasharray: "3 3" }} />
          <Area type="monotone" dataKey="net" name="Net income" stroke={C1} strokeWidth={2} fill="url(#netFill)" dot={{ r: 3, fill: C1, strokeWidth: 0 }} activeDot={{ r: 5, stroke: "#141917", strokeWidth: 2 }} animationDuration={1400} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
