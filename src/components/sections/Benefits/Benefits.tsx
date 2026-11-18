import { BenefitsMotion } from "./BenefitsMotion";
import styles from "./Benefits.module.scss";

const BENEFITS = [
  { n: "01", t: "Built for car washes.", d: "Bays, packages, vehicles and washers are first-class ideas — not a generic shop system bent to fit.", tag: "Purpose-built" },
  { n: "02", t: "One system, not five spreadsheets.", d: "Jobs, billing, customers, staff and expenses share one record, so the numbers always agree.", tag: "Single source of truth" },
  { n: "03", t: "Never lose a due again.", d: "Running customer ledgers, bulk payments and reminders keep receivables visible until they're cleared.", tag: "Cash flow" },
  { n: "04", t: "Payroll without paperwork.", d: "Attendance, salary, advances and transfer references in one place — calculated, recorded, done.", tag: "Team" },
  { n: "05", t: "See the real profit.", d: "Income against expense, by day and month, so you can price and plan with confidence.", tag: "Clarity" },
];

const AUDIENCES = ["Single-bay car washes", "Multi-bay wash centres", "Detailing studios", "Fleet & commercial washing"];

export function Benefits() {
  return (
    <section id="benefits" className={styles.section} aria-labelledby="benefits-title">
      <div className={styles.pin} data-benefits-pin>
        <div className={`container ${styles.head}`}>
          <p className={styles.eyebrow}>
            <span>12</span> Why WashFlow
          </p>
          <h2 id="benefits-title" className={styles.title}>
            Less admin. <em>More cars.</em>
          </h2>
        </div>

        <div className={styles.track} data-benefits-track>
          {BENEFITS.map((b) => (
            <article key={b.n} className={styles.panel}>
              <span className={styles.n} aria-hidden="true">
                {b.n}
              </span>
              <p className={styles.tag}>{b.tag}</p>
              <h3 className={styles.pTitle}>{b.t}</h3>
              <p className={styles.pText}>{b.d}</p>
            </article>
          ))}
          <article className={`${styles.panel} ${styles.audience}`}>
            <p className={styles.tag}>Who it&apos;s for</p>
            <h3 className={styles.pTitle}>Car wash businesses of every size.</h3>
            <ul>
              {AUDIENCES.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
      <BenefitsMotion />
    </section>
  );
}
