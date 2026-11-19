import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import styles from "./SectionHeading.module.scss";

type Props = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "start" | "split";
  as?: "h2" | "h3";
  id?: string;
  className?: string;
};

/** Numbered editorial heading: "05 — WASH & SERVICE" + big title + intro. */
export function SectionHeading({ index, eyebrow, title, intro, align = "start", as: Tag = "h2", id, className }: Props) {
  return (
    <header className={cx(styles.head, styles[align], className)}>
      <div className={styles.titleCol}>
        <p className={styles.eyebrow} data-reveal="fade">
          {index && <span className={styles.index}>{index}</span>}
          <span className={styles.rule} aria-hidden="true" />
          {eyebrow}
        </p>
        <Tag id={id} className={styles.title} data-split>
          {title}
        </Tag>
      </div>
      {intro && (
        <div className={styles.intro} data-reveal>
          {intro}
        </div>
      )}
    </header>
  );
}
