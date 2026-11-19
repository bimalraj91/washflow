import { Check, Minus } from "lucide-react";
import { PLANS, PLAN_MATRIX } from "@/lib/plans";
import { PricingPlans } from "./PricingPlans";
import styles from "./Pricing.module.scss";

export function Pricing() {
  return (
    <section id="pricing" className={styles.section} aria-labelledby="pricing-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow} data-reveal="fade">
              <span>13</span> Subscriptions
            </p>
            <h2 id="pricing-title" className={styles.title} data-split>
              Pick your <em>lane.</em>
            </h2>
          </div>
          <p className={styles.intro} data-reveal>
            Three plans that grow with your car wash — from a single bay to multiple locations. Every plan includes
            onboarding help and free updates. No setup fee.
          </p>
        </div>

        <PricingPlans />

        <details className={styles.compare} data-reveal>
          <summary>
            <span>Compare all features</span>
            <span className={styles.chev} aria-hidden="true" />
          </summary>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className="sr-only">Feature comparison across WashFlow plans</caption>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  {PLANS.map((p) => (
                    <th key={p.id} scope="col">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAN_MATRIX.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    {row.values.map((v, i) => (
                      <td key={i}>
                        {v === true ? (
                          <>
                            <Check size={16} className={styles.yes} aria-hidden="true" />
                            <span className="sr-only">Included</span>
                          </>
                        ) : v === false ? (
                          <>
                            <Minus size={16} className={styles.no} aria-hidden="true" />
                            <span className="sr-only">Not included</span>
                          </>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <p className={styles.fine}>
          Prices in INR, exclusive of GST. Yearly plans are billed annually. Need something custom for a large fleet?
          Create an account and we&apos;ll size a plan with you.
        </p>
      </div>
    </section>
  );
}
