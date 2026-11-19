import Image from "next/image";
import type { Ref } from "react";
import { Check } from "lucide-react";
import styles from "./WashTunnel.module.scss";

const STATIONS = ["Arrival", "Service", "Foam wash", "Quality check", "Payment", "Done"];

const CHIPS = [
  "KL 07 CK 4821 · checked in",
  "Ceramic Foam Wash · ₹1,499",
  "Bay 01 · foam + rinse",
  "QC passed · interior + glass",
  "₹1,499 paid via UPI",
  "Invoice shared · job closed",
];

// Deterministic foam drops / jets so server and client markup match.
const DROPS = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 37) % 100,
  d: ((i * 0.23) % 1.4).toFixed(2),
  s: 3 + ((i * 7) % 5),
}));
const JETS = [12, 30, 50, 70, 88];

type Props = {
  stage: number;
  /** The parent writes the car position into `--x` (0 → 1) on this element. */
  ref?: Ref<HTMLDivElement>;
};

/**
 * A side-on 3D wash tunnel. Six arches stand in a perspective scene; the car
 * (a real photo) drives through them as `--x` goes 0 → 1. Each arch has a far
 * post (behind the car) and a near post (in front), so the car genuinely
 * passes *through* it, and a slight camera pan tied to `--x` gives parallax.
 * Station effects key off `data-stage`.
 */
export function WashTunnel({ stage, ref }: Props) {
  return (
    <div ref={ref} className={styles.tunnel} data-stage={stage} aria-hidden="true">
      <div className={styles.world}>
        <div className={styles.wall}>
          <span className={styles.sign}>WASHFLOW · TUNNEL 01</span>
        </div>
        <div className={styles.floor} />

        {STATIONS.map((name, i) => (
          <div
            key={name}
            className={styles.station}
            style={{ "--i": i } as React.CSSProperties}
            data-on={i === stage || undefined}
            data-done={i < stage || undefined}
          >
            <span className={`${styles.post} ${styles.far}`} />
            <span className={styles.beam} />
            <span className={`${styles.post} ${styles.near}`} />
            <span className={styles.label}>
              <b>0{i + 1}</b> {name}
            </span>

            {i === 0 && <span className={styles.laser} />}
            {i === 2 && (
              <span className={styles.foamFx}>
                {DROPS.map((d, k) => (
                  <i key={k} style={{ left: `${d.x}%`, width: d.s, height: d.s, animationDelay: `${d.d}s` }} />
                ))}
                {JETS.map((x) => (
                  <em key={x} style={{ left: `${x}%` }} />
                ))}
              </span>
            )}
          </div>
        ))}

        <div className={styles.car}>
          <div className={styles.carBody}>
            <Image src="/images/tunnel-car.jpg" alt="" fill sizes="(min-width: 1024px) 30vw, 45vw" quality={78} className={styles.carImg} />
            <span className={styles.foam} />
            <span className={styles.wet} />
            <span className={styles.scan} />
            <span className={styles.shine} />
          </div>
          <span className={styles.shadow} />
          <span className={styles.chip} key={stage}>
            {stage >= 4 && <Check size={11} strokeWidth={3} />}
            {CHIPS[stage]}
          </span>
        </div>
      </div>
    </div>
  );
}
