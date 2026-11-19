"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { Button } from "@/components/ui/Button/Button";
import { cx, formatINR } from "@/lib/utils";
import styles from "./Pricing.module.scss";

export function PricingPlans() {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");

  return (
    <>
      <div className={styles.cycle} role="radiogroup" aria-label="Billing cycle">
        {(["monthly", "yearly"] as const).map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={cycle === c}
            className={cx(styles.cycleBtn, cycle === c && styles.cycleOn)}
            onClick={() => setCycle(c)}
          >
            {cycle === c && <motion.span layoutId="cycle-bg" className={styles.cycleBg} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className={styles.cycleLabel}>
              {c === "monthly" ? "Monthly" : "Yearly"}
              {c === "yearly" && <span className={styles.save}>2 months free</span>}
            </span>
          </button>
        ))}
      </div>

      <ul className={styles.plans} data-reveal-stagger>
        {PLANS.map((p, i) => {
          const price = cycle === "monthly" ? p.monthly : p.yearly;
          return (
            <li key={p.id} className={cx(styles.plan, p.featured && styles.featured)}>
              {p.featured && <span className={styles.flag}>Most popular</span>}
              <div className={styles.planTop}>
                <span className={styles.planIdx}>0{i + 1}</span>
                <h3 className={styles.planName}>{p.name}</h3>
                <p className={styles.tagline}>{p.tagline}</p>
              </div>

              <div className={styles.price}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={price}
                    className={styles.amount}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {formatINR(price)}
                  </motion.span>
                </AnimatePresence>
                <span className={styles.per}>/ month</span>
              </div>
              <p className={styles.billed}>
                {cycle === "yearly" ? `${formatINR(price * 12)} billed yearly` : "Billed monthly · cancel anytime"}
              </p>

              <ul className={styles.scale}>
                {p.scale.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>

              <ul className={styles.features}>
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href="/sign-up"
                variant={p.featured ? "primary" : "ghost"}
                size="lg"
                arrow
                magnetic={p.featured}
                className={styles.planCta}
              >
                {p.cta}
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
