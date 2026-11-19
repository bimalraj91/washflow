"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Car, ClipboardList, Droplets, ShieldCheck, IndianRupee, CheckCircle2 } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/animations/gsap";
import { StatusChip, type Status } from "@/components/ui/StatusChip/StatusChip";
import { DemoTag } from "@/components/mockups/Frames";
import { cx, formatINR } from "@/lib/utils";
import styles from "./WashManagement.module.scss";

const STAGES: Array<{ title: string; note: string; Icon: typeof Car; job: Status; pay: Status; progress: number; log: string }> = [
  { title: "Vehicle arrival", note: "Plate captured, history pulled up instantly.", Icon: Car, job: "new", pay: "pending", progress: 0, log: "KL 07 CK 4821 checked in · returning customer" },
  { title: "Service selection", note: "Pick a package, add-ons and price in two taps.", Icon: ClipboardList, job: "new", pay: "pending", progress: 8, log: "Ceramic Foam Wash + Tyre Shine · ₹1,499" },
  { title: "Wash in progress", note: "Assigned to a bay and a washer. Status live.", Icon: Droplets, job: "progress", pay: "pending", progress: 58, log: "Bay 01 · Anil Kumar started 10:14" },
  { title: "Quality check", note: "Final inspection before handover.", Icon: ShieldCheck, job: "waiting", pay: "pending", progress: 88, log: "QC by Joseph · interior + glass passed" },
  { title: "Payment", note: "Cash, UPI, card or added to the customer ledger.", Icon: IndianRupee, job: "waiting", pay: "paid", progress: 96, log: "₹1,499 received via UPI · ref 4410…921" },
  { title: "Completed", note: "Logged to vehicle history and service income.", Icon: CheckCircle2, job: "completed", pay: "paid", progress: 100, log: "Job closed 10:42 · invoice shared" },
];

export function WashWorkflow() {
  const [stage, setStage] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const pinned = useRef(false);

  // Desktop: pin and let scroll drive the stage.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        pinned.current = true;
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top top+=88",
          end: () => `+=${window.innerHeight * 2.2}`,
          pin: true,
          scrub: true,
          onUpdate: (self) => setStage(Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length))),
        });
        return () => {
          pinned.current = false;
          st.kill();
        };
      });
    },
    { scope: root },
  );

  // Mobile / reduced motion: gently auto-advance while visible.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting && !pinned.current && !window.matchMedia(MQ.reduce).matches) {
        timer = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 2600);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  const s = STAGES[stage];

  return (
    <div ref={root} className={styles.flow}>
      <ol className={styles.steps}>
        {STAGES.map((st, i) => (
          <li key={st.title}>
            <button
              type="button"
              className={cx(styles.step, i === stage && styles.stepActive, i < stage && styles.stepDone)}
              aria-current={i === stage ? "step" : undefined}
              onClick={() => setStage(i)}
              onPointerEnter={(e) => {
                // Hover previews the stage on mouse devices; touch uses tap.
                if (e.pointerType === "mouse") setStage(i);
              }}
              onFocus={() => setStage(i)}
            >
              <span className={styles.stepIcon} aria-hidden="true">
                <st.Icon size={16} />
              </span>
              <span className={styles.stepText}>
                <span className={styles.stepTitle}>
                  <span className={styles.stepNum}>0{i + 1}</span> {st.title}
                </span>
                <span className={styles.stepNote}>{st.note}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className={styles.jobCard} aria-live="polite">
        <div className={styles.jobHead}>
          <span className={styles.jobId}>JOB #WF-10482</span>
          <DemoTag />
        </div>

        <div className={styles.vehicle}>
          <div>
            <p className={styles.plate}>KL 07 CK 4821</p>
            <p className={styles.model}>Hyundai Creta · SUV · Arjun Menon</p>
          </div>
          <div className={styles.chips}>
            <StatusChip status={s.job} />
            <StatusChip status={s.pay} />
          </div>
        </div>

        <div className={styles.track}>
          <div className={styles.trackFill} style={{ transform: `scaleX(${s.progress / 100})` }} />
          {STAGES.map((st, i) => (
            <span key={st.title} className={cx(styles.dot, i <= stage && styles.dotOn)} style={{ left: `${(i / (STAGES.length - 1)) * 100}%` }} />
          ))}
        </div>
        <div className={styles.trackMeta}>
          <span>{s.title}</span>
          <span className="tabular">{s.progress}%</span>
        </div>

        <dl className={styles.facts}>
          <div>
            <dt>Service</dt>
            <dd>{stage === 0 ? "—" : "Ceramic Foam Wash"}</dd>
          </div>
          <div>
            <dt>Bay · Staff</dt>
            <dd>{stage < 2 ? "Unassigned" : "B1 · Anil"}</dd>
          </div>
          <div>
            <dt>Amount</dt>
            <dd className="tabular">{stage === 0 ? "—" : formatINR(1499)}</dd>
          </div>
          <div>
            <dt>Visits</dt>
            <dd>38th wash</dd>
          </div>
        </dl>

        <div className={styles.log}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={stage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.logTime}>10:{String(14 + stage * 5).padStart(2, "0")}</span> {s.log}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
