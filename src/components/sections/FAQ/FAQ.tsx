import { FAQS } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion/Accordion";
import { Button } from "@/components/ui/Button/Button";
import styles from "./FAQ.module.scss";

export function FAQ() {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.side}>
          <p className={styles.eyebrow} data-reveal="fade">
            <span>14</span> FAQ
          </p>
          <h2 id="faq-title" className={styles.title} data-split>
            Questions, <em>answered.</em>
          </h2>
          <p className={styles.intro} data-reveal>
            Everything car wash owners usually ask before switching from notebooks and spreadsheets.
          </p>
          <div data-reveal>
            <Button href="/sign-up" variant="ghost" arrow>
              Create an account
            </Button>
          </div>
        </div>
        <div data-reveal>
          <Accordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}
