import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { SettingsPreview } from "./SettingsPreview";
import styles from "./Configuration.module.scss";

export function Configuration() {
  return (
    <section id="settings" className={styles.section} aria-labelledby="settings-title">
      <div className="container">
        <SectionHeading
          index="11"
          eyebrow="Configuration & settings"
          id="settings-title"
          align="split"
          title={
            <>
              Set it up <em>your way.</em>
            </>
          }
          intro={
            <p>
              Your services and prices, ledgers, bank accounts, accepted payment methods and business details — all
              configurable, so WashFlow matches how your car wash already works.
            </p>
          }
        />
        <div data-reveal>
          <SettingsPreview />
        </div>
      </div>
    </section>
  );
}
