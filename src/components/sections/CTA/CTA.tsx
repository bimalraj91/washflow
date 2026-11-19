import { Button } from "@/components/ui/Button/Button";
import { StatusChip } from "@/components/ui/StatusChip/StatusChip";
import { DemoTag } from "@/components/mockups/Frames";
import { formatINR } from "@/lib/utils";
import { OVERVIEW } from "@/lib/mockData";
import styles from "./CTA.module.scss";

export function CTA() {
  return (
    <section id="book-demo" className={styles.section} aria-labelledby="cta-title">
      <svg className={styles.lines} viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M${720 + (i - 6) * 20} 380 L${720 + (i - 6) * 190} 600`} />
        ))}
        <path d="M0 380 H1440" />
      </svg>

      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow} data-reveal="fade">
          <span className={styles.dot} /> Ready when you are
        </p>
        <h2 id="cta-title" className={styles.title}>
          <span data-reveal>Less manual work.</span>
          <span data-reveal>
            More business <em>in motion.</em>
          </span>
        </h2>
        <p className={styles.lead} data-reveal>
          Bring every wash, customer, payment and operation together in one powerful system.
        </p>
        <div className={styles.ctas} data-reveal>
          <Button href="/sign-up" size="lg" arrow magnetic>
            Create your account
          </Button>
          <Button href="/#platform" variant="ghost" size="lg">
            Explore the platform
          </Button>
        </div>

        <div className={styles.fragment} aria-hidden="true">
          <div className={styles.fCard}>
            <span>Revenue today</span>
            <b>{formatINR(OVERVIEW.revenue)}</b>
            <DemoTag />
          </div>
          <div className={styles.fCard}>
            <span>Washes</span>
            <b>{OVERVIEW.washes}</b>
            <StatusChip status="progress" label="3 live" />
          </div>
          <div className={styles.fCard}>
            <span>Dues cleared</span>
            <b>{formatINR(9850)}</b>
            <StatusChip status="paid" />
          </div>
        </div>
      </div>
    </section>
  );
}
