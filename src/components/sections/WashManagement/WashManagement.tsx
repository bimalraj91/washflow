import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { WashWorkflow } from "./WashWorkflow";
import styles from "./WashManagement.module.scss";

const FEATURES = [
  "Wash & service job creation",
  "Job status marking",
  "Service progress tracking",
  "Vehicle service history",
  "Payment status per job",
  "Service income tracking",
];

export function WashManagement() {
  return (
    <section id="features" className={styles.section} aria-labelledby="wash-title">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Wash & service management"
          id="wash-title"
          align="split"
          title={
            <>
              From arrival to <em>paid.</em> Every step tracked.
            </>
          }
          intro={
            <>
              <p>
                Car wash service tracking software should follow the car, not the paperwork. Each job moves from New
                to Completed with its bay, staff, price and payment status always visible.
              </p>
              <ul className={styles.featureList}>
                {FEATURES.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </>
          }
        />
        <WashWorkflow />
      </div>
    </section>
  );
}
