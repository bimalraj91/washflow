import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { BrowserFrame } from "@/components/mockups/Frames";
import { FitFrame } from "@/components/mockups/FitFrame";
import { Dashboard } from "@/components/mockups/Dashboard";
import styles from "./DashboardShowcase.module.scss";

const POINTS = [
  { k: "01", t: "One screen, whole business", d: "Revenue, washes, dues and expenses the moment you open the app." },
  { k: "02", t: "Built for the counter", d: "Fast entry for busy hours — create a job in under ten seconds." },
  { k: "03", t: "Numbers that reconcile", d: "Every rupee traced to a wash, a customer and a payment method." },
];

export function DashboardShowcase() {
  return (
    <section id="platform" className={styles.section} aria-labelledby="platform-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="The platform"
          id="platform-title"
          align="split"
          title={
            <>
              Your whole car wash. <em>One dashboard.</em>
            </>
          }
          intro={
            <p>
              WashFlow is car wash management software that brings services, billing, customers, staff and finances
              into a single, fast workspace. Switch the tabs below to explore an interactive preview running on demo data.
            </p>
          }
        />

        <FitFrame width={1182} minScale={0.62} tilt={16}>
          <BrowserFrame>
            <Dashboard />
          </BrowserFrame>
        </FitFrame>

        <ul className={styles.points} data-reveal-stagger>
          {POINTS.map((p) => (
            <li key={p.k}>
              <span className={styles.k}>{p.k}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
