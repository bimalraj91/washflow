import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import styles from "./Marquee.module.scss";

/**
 * CSS-only seamless marquee: the track holds two copies and slides by -50%.
 * The duplicate is hidden from assistive tech. Pauses on hover/focus, stops
 * under reduced motion.
 */
export function Marquee({ items, label, className, reverse }: { items: ReactNode[]; label: string; className?: string; reverse?: boolean }) {
  const group = (hidden: boolean) => (
    <ul className={styles.group} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cx(styles.marquee, reverse && styles.reverse, className)} role="region" aria-label={label}>
      <div className={styles.track}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
