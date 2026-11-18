"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cx } from "@/lib/utils";
import styles from "./Accordion.module.scss";

type Item = { q: string; a: string };

/** WAI-ARIA accordion: buttons in headings, aria-expanded/controls, one open at a time. */
export function Accordion({ items, headingLevel = 3 }: { items: readonly Item[]; headingLevel?: 3 | 4 }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const reduce = useReducedMotion();
  const H = `h${headingLevel}` as "h3" | "h4";

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-b${i}`;
        const panelId = `${baseId}-p${i}`;
        return (
          <div key={item.q} className={cx(styles.item, isOpen && styles.open)}>
            <H className={styles.heading}>
              <button
                id={btnId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className={styles.num} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.q}>{item.q}</span>
                <span className={styles.icon} aria-hidden="true">
                  <Plus size={18} />
                </span>
              </button>
            </H>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={styles.panel}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  // Same animated props on server and client (no hydration drift); reduced motion just snaps.
                  transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className={styles.a}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
