import { CAPABILITIES } from "@/lib/constants";
import { Marquee } from "@/components/ui/Marquee/Marquee";
import styles from "./TrustStrip.module.scss";

export function TrustStrip() {
  return (
    <section id="capabilities" className={styles.strip} aria-label="Platform capabilities">
      <Marquee
        label="WashFlow capabilities"
        items={CAPABILITIES.map((c) => (
          <span key={c} className={styles.item}>
            <span className={styles.mark} aria-hidden="true" />
            {c}
          </span>
        ))}
      />
    </section>
  );
}
