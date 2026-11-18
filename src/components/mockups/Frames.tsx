import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cx } from "@/lib/utils";
import styles from "./Frames.module.scss";

export function DemoTag({ className }: { className?: string }) {
  return <span className={cx(styles.demoTag, className)}>Demo data</span>;
}

export function BrowserFrame({ url = "app.washflow.app/dashboard", children, className }: { url?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cx(styles.browser, className)}>
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>
          <Lock size={10} strokeWidth={2.5} />
          {url}
        </span>
        <DemoTag />
      </div>
      <div className={styles.viewport}>{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  return (
    <figure className={cx(styles.phone, className)} aria-label={label}>
      <div className={styles.screen}>
        <div className={styles.status} aria-hidden="true">
          <span>9:41</span>
          <span className={styles.island} />
          <span className={styles.bars}>
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        {children}
      </div>
    </figure>
  );
}

/** Generic product card panel used inside feature showcases. */
export function Panel({ title, meta, children, className }: { title?: string; meta?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cx(styles.panel, className)}>
      {(title || meta) && (
        <div className={styles.panelHead}>
          {title && <span className={styles.panelTitle}>{title}</span>}
          {meta}
        </div>
      )}
      {children}
    </div>
  );
}
