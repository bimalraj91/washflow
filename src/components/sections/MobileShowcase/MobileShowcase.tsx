import { Bell, Check, ChevronRight, Droplets, IndianRupee, Share2, Smartphone } from "lucide-react";
import { PhoneFrame } from "@/components/mockups/Frames";
import { StatusChip } from "@/components/ui/StatusChip/StatusChip";
import { OVERVIEW, JOBS } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import { MobileMotion } from "./MobileMotion";
import styles from "./MobileShowcase.module.scss";

function OwnerScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.sTop}>
        <div>
          <small>Sparkle Studio</small>
          <b>Today</b>
        </div>
        <span className={styles.iconBtn}>
          <Bell size={14} />
        </span>
      </div>
      <div className={styles.hero}>
        <small>Revenue</small>
        <b>{formatINR(OVERVIEW.revenue)}</b>
        <span>▲ 12.4%</span>
        <svg viewBox="0 0 200 50" aria-hidden="true">
          <path d="M0 42 L25 36 L50 38 L75 26 L100 30 L125 18 L150 22 L175 10 L200 6" />
        </svg>
      </div>
      <div className={styles.tiles}>
        <div>
          <small>Washes</small>
          <b>{OVERVIEW.washes}</b>
        </div>
        <div>
          <small>Pending</small>
          <b className={styles.warn}>{formatINR(OVERVIEW.pending)}</b>
        </div>
        <div>
          <small>Expenses</small>
          <b>{formatINR(OVERVIEW.expenses)}</b>
        </div>
        <div>
          <small>Net</small>
          <b className={styles.volt}>{formatINR(OVERVIEW.net)}</b>
        </div>
      </div>
      <p className={styles.listLabel}>Bays</p>
      <ul className={styles.list}>
        {JOBS.slice(0, 3).map((j) => (
          <li key={j.vehicle}>
            <span className={styles.bay}>{j.bay}</span>
            <span className={styles.lm}>
              <b>{j.model}</b>
              <small>{j.service}</small>
            </span>
            <StatusChip status={j.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function JobScreen() {
  const steps = ["Arrived", "Service selected", "Washing", "Quality check", "Payment"];
  return (
    <div className={styles.screen}>
      <div className={styles.sTop}>
        <div>
          <small>Job #WF-10482</small>
          <b>Wash status</b>
        </div>
        <StatusChip status="progress" />
      </div>
      <div className={styles.jobVisual}>
        <div className={styles.ring}>
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="42" className={styles.ringBg} />
            <circle cx="50" cy="50" r="42" className={styles.ringFg} />
          </svg>
          <span>
            <b>64%</b>
            <small>Rinse</small>
          </span>
        </div>
        <p className={styles.jPlate}>KL 07 CK 4821</p>
        <p className={styles.jModel}>Hyundai Creta · Bay 01</p>
      </div>
      <ol className={styles.timeline}>
        {steps.map((s, i) => (
          <li key={s} data-state={i < 2 ? "done" : i === 2 ? "now" : "next"}>
            <span>{i < 2 ? <Check size={10} /> : i === 2 ? <Droplets size={10} /> : null}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

function InvoiceScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.sTop}>
        <div>
          <small>Invoice</small>
          <b>INV-2611-0482</b>
        </div>
        <span className={styles.iconBtn}>
          <Share2 size={14} />
        </span>
      </div>
      <div className={styles.invoice}>
        <p className={styles.iName}>Arjun Menon</p>
        <p className={styles.iSub}>KL 07 CK 4821 · 18 Nov</p>
        <ul className={styles.lines}>
          <li>
            <span>Ceramic Foam Wash</span>
            <b>{formatINR(1299)}</b>
          </li>
          <li>
            <span>Tyre shine</span>
            <b>{formatINR(200)}</b>
          </li>
          <li>
            <span>Previous due</span>
            <b className={styles.warn}>{formatINR(3299)}</b>
          </li>
        </ul>
        <div className={styles.iTotal}>
          <span>Total</span>
          <b>{formatINR(4798)}</b>
        </div>
      </div>
      <div className={styles.methods}>
        {["UPI", "Cash", "Card"].map((m, i) => (
          <span key={m} data-on={i === 0 || undefined}>
            {m}
          </span>
        ))}
      </div>
      <span className={styles.payBtn}>
        <IndianRupee size={13} /> Record payment <ChevronRight size={13} />
      </span>
    </div>
  );
}

export function MobileShowcase() {
  return (
    <section id="mobile" className={styles.section} aria-labelledby="mobile-title">
      <div className={styles.bg} aria-hidden="true" />
      <div className="container">
        <div className={styles.head}>
          <p className={styles.eyebrow} data-reveal="fade">
            <span>09</span> Mobile preview
          </p>
          <h2 id="mobile-title" className={styles.title} data-reveal>
            The floor, <em>in your pocket.</em>
          </h2>
          <p className={styles.intro} data-reveal>
            A look at where WashFlow is heading on mobile: owner dashboard, live job status and customer invoices,
            designed for one-handed use between cars.
          </p>
          <p className={styles.notice} data-reveal>
            <Smartphone size={14} aria-hidden="true" /> Design preview · mobile apps are not yet available
          </p>
        </div>

        <div className={styles.stage} data-mobile-stage>
          <div className={styles.phoneSlot} data-phone="left">
            <PhoneFrame label="Preview: owner dashboard screen">
              <OwnerScreen />
            </PhoneFrame>
            <p className={styles.caption}>01 · Owner dashboard</p>
          </div>
          <div className={styles.phoneSlot} data-phone="center">
            <PhoneFrame label="Preview: wash job status screen">
              <JobScreen />
            </PhoneFrame>
            <p className={styles.caption}>02 · Wash job status</p>
          </div>
          <div className={styles.phoneSlot} data-phone="right">
            <PhoneFrame label="Preview: customer invoice and payment screen">
              <InvoiceScreen />
            </PhoneFrame>
            <p className={styles.caption}>03 · Payment & invoice</p>
          </div>
        </div>
      </div>
      <MobileMotion />
    </section>
  );
}
