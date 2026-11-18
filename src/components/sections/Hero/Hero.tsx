import { ArrowDown, Droplets } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { StatusChip } from "@/components/ui/StatusChip/StatusChip";
import { CarRender } from "@/components/mockups/CarRender";
import { DemoTag } from "@/components/mockups/Frames";
import { formatINR } from "@/lib/utils";
import { OVERVIEW } from "@/lib/mockData";
import { HeroMotion } from "./HeroMotion";
import styles from "./Hero.module.scss";

const LINES = [
  ["Run your"],
  ["car wash."],
  ["Not your ", <em key="c">chaos.</em>],
];

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.beam} />
        <div className={styles.grid} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.meta}>
          <p className={styles.badge}>
            <span className={styles.pulse} />
            Built for modern car washes
          </p>
          <p className={styles.code}>WF—01 / OPERATIONS CONSOLE</p>
        </div>

        <h1 id="hero-title" className={styles.title}>
          {LINES.map((line, i) => (
            <span key={i} className={styles.line}>
              <span className={styles.lineInner} style={{ animationDelay: `${0.12 + i * 0.11}s` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            <p className={styles.lead}>
              One powerful platform to manage washes, payments, customers, employees, expenses and every operation of
              your car wash business.
            </p>
            <div className={styles.ctas}>
              <Button href="#platform" size="lg" arrow magnetic>
                Explore the Platform
              </Button>
              <Button href="/#book-demo" data-demo-trigger="" variant="ghost" size="lg">
                Book a Demo
              </Button>
            </div>
          </div>
          {/* Vehicle + floating product widgets */}
          <div className={styles.scene}>
            <div className={styles.carWrap} data-hero-car>
              <div className={styles.carMask}>
                <CarRender className={styles.car} />
                <span className={styles.arch} aria-hidden="true" />
              </div>
            </div>

            <div className={`${styles.widget} ${styles.revenue}`} data-depth="0.6" aria-hidden="true">
              <div className={styles.wHead}>
                <span>Today&apos;s revenue</span>
                <DemoTag />
              </div>
              <p className={styles.wValue}>{formatINR(OVERVIEW.revenue)}</p>
              <p className={styles.wDelta}>▲ 12.4% vs last Sunday</p>
              <svg viewBox="0 0 160 40" className={styles.spark}>
                <path d="M0 32 L20 28 L40 30 L60 20 L80 23 L100 14 L120 17 L140 8 L160 4" />
              </svg>
            </div>

            <div className={`${styles.widget} ${styles.status}`} data-depth="1" aria-hidden="true">
              <div className={styles.wHead}>
                <span>Bay 01 · KL 07 CK 4821</span>
                <StatusChip status="progress" />
              </div>
              <p className={styles.wService}>
                <Droplets size={14} /> Ceramic Foam Wash
              </p>
              <div className={styles.bar}>
                <span />
              </div>
              <div className={styles.wFoot}>
                <span>Rinse → Dry</span>
                <span className="tabular">64%</span>
              </div>
            </div>

            <div className={`${styles.widget} ${styles.queue}`} data-depth="0.35" aria-hidden="true">
              <div className={styles.wHead}>
                <span>Live floor</span>
                <span className={styles.live}>● Live</span>
              </div>
              <ul>
                <li>
                  <b>B1</b> Creta <StatusChip status="progress" label="64%" />
                </li>
                <li>
                  <b>B2</b> Fortuner <StatusChip status="progress" label="31%" />
                </li>
                <li>
                  <b>B3</b> Swift <StatusChip status="completed" label="Done" />
                </li>
                <li>
                  <b>Q</b> Seltos <StatusChip status="waiting" />
                </li>
              </ul>
              <p className={styles.qFoot}>
                <span className="tabular">{OVERVIEW.washes}</span> washes today
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.footer}`}>
        <a href="#capabilities" className={styles.scroll}>
          <span className={styles.scrollIcon}>
            <ArrowDown size={14} />
          </span>
          Scroll to explore
        </a>
        <p className={styles.coords}>Bays 01—04 · Synced 2s ago</p>
      </div>

      <HeroMotion />
    </section>
  );
}
