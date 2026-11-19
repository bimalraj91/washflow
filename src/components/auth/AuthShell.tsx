import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo/Logo";
import { AuthArt, type ArtKind } from "./AuthArt";
import { cx } from "@/lib/utils";
import styles from "./AuthShell.module.scss";

type Props = {
  art: ArtKind;
  step?: { current: number; total: number; labels: string[] };
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  caption: { title: ReactNode; text: string };
  back?: { href: string; label: string };
  /** Tighter spacing so long forms fit one laptop viewport. */
  compact?: boolean;
  children: ReactNode;
};

/** Split-screen auth layout: form on the left, animated illustration on the right. */
export function AuthShell({ art, step, eyebrow, title, lead, caption, back, compact, children }: Props) {
  return (
    <div className={styles.shell}>
      <section className={styles.panel}>
        <header className={styles.top}>
          <Link href="/" aria-label="WashFlow home" className={styles.logo}>
            <Logo />
          </Link>
          {back ? (
            <Link href={back.href} className={styles.back}>
              <ArrowLeft size={14} aria-hidden="true" /> {back.label}
            </Link>
          ) : (
            <Link href="/" className={styles.back}>
              <ArrowLeft size={14} aria-hidden="true" /> Back to site
            </Link>
          )}
        </header>

        <div className={styles.main}>
          <div className={cx(styles.card, compact && styles.compact)}>
            {step && (
              <ol className={styles.steps} aria-label={`Step ${step.current} of ${step.total}`}>
                {step.labels.map((l, i) => (
                  <li key={l} data-state={i + 1 < step.current ? "done" : i + 1 === step.current ? "now" : "todo"} aria-current={i + 1 === step.current ? "step" : undefined}>
                    <i />
                    <span>{l}</span>
                  </li>
                ))}
              </ol>
            )}
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 className={styles.title}>{title}</h1>
            {lead && <p className={styles.lead}>{lead}</p>}
            <div className={styles.body}>{children}</div>
          </div>
        </div>

        <footer className={styles.legal}>
          © 2026 WashFlow · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>
        </footer>
      </section>

      <aside className={styles.art} aria-hidden="true">
        <AuthArt kind={art} />
        <div className={styles.caption} key={art}>
          <p className={styles.capTitle}>{caption.title}</p>
          <p className={styles.capText}>{caption.text}</p>
        </div>
      </aside>
    </div>
  );
}
