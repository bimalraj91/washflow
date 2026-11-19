import { PaymentTerminal } from "./PaymentTerminal";
import styles from "./PaymentDemo.module.scss";

const STEPS = ["Pick the wash service", "Add any previous due", "Choose how they paid", "Mark paid & share the invoice"];

export function PaymentDemo() {
  return (
    <section id="payment-demo" className={styles.section} aria-labelledby="payment-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-reveal="fade">
            <span>10</span> Try it
          </p>
          <h2 id="payment-title" className={styles.title} data-split>
            Checkout in <em>four taps.</em>
          </h2>
          <p className={styles.intro} data-reveal>
            This is how car wash billing feels in WashFlow. Change the service, the payment method or the status and
            watch the bill update — it&apos;s a front-end demo, so no real payment is made.
          </p>
          <ol className={styles.steps} data-reveal-stagger>
            {STEPS.map((s, i) => (
              <li key={s}>
                <span>{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div data-reveal>
          <PaymentTerminal />
        </div>
      </div>
    </section>
  );
}
