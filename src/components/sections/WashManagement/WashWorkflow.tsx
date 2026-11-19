"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Car, ClipboardList, Droplets, ShieldCheck, IndianRupee, CheckCircle2 } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/animations/gsap";
import { StatusChip, type Status } from "@/components/ui/StatusChip/StatusChip";
import { DemoTag } from "@/components/mockups/Frames";
import { cx, formatINR } from "@/lib/utils";
import { useLenis } from "@/lib/animations/lenis";
import { WashTunnel } from "./WashTunnel";
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
  const tunnel = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const lenis = useLenis();

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
          onUpdate: (self) => {
            setStage(Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length)));
            tunnel.current?.style.setProperty("--x", carPosition(self.progress).toFixed(4));
          },
        });
        trigger.current = st;
        tunnel.current?.removeAttribute("data-smooth");
        return () => {
          pinned.current = false;
          trigger.current = null;
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

  // Without the scroll pin (mobile, tablet, reduced motion) the car glides
  // from station to station whenever the stage changes.
  useEffect(() => {
    const el = tunnel.current;
    if (!el || pinned.current) return;
    el.setAttribute("data-smooth", "");
    el.style.setProperty("--x", String(stage / (STAGES.length - 1)));
  }, [stage]);

  // Pinned: clicking a step scrolls to its segment, so the car drives there.
  const goTo = (i: number) => {
    const st = trigger.current;
    if (!st) return setStage(i);
    const y = st.start + ((i + 0.5) / STAGES.length) * (st.end - st.start);
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const s = STAGES[stage];

  return (
    <div ref={root} className={styles.pinWrap}>
      <WashTunnel ref={tunnel} stage={stage} />
      <div className={styles.flow}>
      <ol className={styles.steps}>
        {STAGES.map((st, i) => (
          <li key={st.title}>
            <button
              type="button"
              className={cx(styles.step, i === stage && styles.stepActive, i < stage && styles.stepDone)}
              aria-current={i === stage ? "step" : undefined}
              onClick={() => goTo(i)}
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
    </div>
  );
}

/**
 * Scroll progress → car position (0–1). The stage switches at each sixth of
 * the scroll; the car is centred under a station mid-segment and dwells there
 * (smoothstep), driving between arches around the switch-over point.
 */
function carPosition(p: number) {
  const n = STAGES.length;
  const t = Math.min(n - 1, Math.max(0, p * n - 0.5));
  const i = Math.floor(t);
  const f = t - i;
  const e = f < 0.2 ? 0 : f > 0.8 ? 1 : ((f - 0.2) / 0.6) ** 2 * (3 - 2 * ((f - 0.2) / 0.6));
  return (i + e) / (n - 1);
}
