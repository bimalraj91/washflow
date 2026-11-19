"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Droplets, Mail, ShieldCheck, Users, Wallet, Car } from "lucide-react";
import Image from "next/image";
import { PHOTOS, type Photo } from "@/lib/images";
import styles from "./AuthArt.module.scss";

export type ArtKind = "signin" | "signup" | "verify" | "success";

const EASE = [0.16, 1, 0.3, 1] as const;

const BUBBLES = Array.from({ length: 14 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  size: 6 + ((i * 13) % 22),
  delay: (i * 0.7) % 6,
  dur: 7 + ((i * 3) % 6),
}));

/** Rising wash-foam bubbles shared across every scene. */
function Bubbles() {
  return (
    <div className={styles.bubbles}>
      {BUBBLES.map((b, i) => (
        <span key={i} style={{ left: `${b.x}%`, width: b.size, height: b.size, animationDelay: `${-b.delay}s`, animationDuration: `${b.dur}s` }} />
      ))}
    </div>
  );
}

function Float({ children, className, delay = 0, y = 10 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      <motion.div animate={reduce ? undefined : { y: [0, -y, 0] }} transition={{ duration: 6 + delay * 2, repeat: Infinity, ease: "easeInOut" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

// ---------------- Sign in: the car in the bay ----------------
function SignIn() {
  return (
    <>
      <Float className={`${styles.card} ${styles.tl}`} delay={0.5}>
        <p className={styles.k}>Today&apos;s revenue</p>
        <p className={styles.v}>₹84,650</p>
        <p className={styles.up}>▲ 12.4% vs last Sunday</p>
        <svg viewBox="0 0 160 36" className={styles.spark}>
          <motion.path d="M0 28 L24 24 L48 26 L72 16 L96 20 L120 10 L160 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 1, ease: EASE }} />
        </svg>
      </Float>
      <Float className={`${styles.card} ${styles.mr}`} delay={0.8} y={8}>
        <p className={styles.k}>Bay 01 · Ceramic Foam Wash</p>
        <div className={styles.bar}>
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 0.64 }} transition={{ duration: 1.8, delay: 1.2, ease: EASE }} />
        </div>
        <p className={styles.foot}>
          <span>Rinse → Dry</span>
          <b>64%</b>
        </p>
      </Float>
    </>
  );
}

// ---------------- Sign up: a fanned stack + setup checklist ----------------
const SETUP = [
  { icon: Car, t: "Create your workspace" },
  { icon: Users, t: "Add bays and staff" },
  { icon: Wallet, t: "Take your first payment" },
];

function SignUp() {
  return (
    <div className={styles.fan}>
      {[
        { r: -9, x: -70, y: 40, d: 0.2, k: "Wash jobs", v: "126", s: "today" },
        { r: 7, x: 70, y: 10, d: 0.4, k: "Pending dues", v: "₹12,400", s: "7 customers" },
        { r: 0, x: 0, y: -50, d: 0.6, k: "Net income", v: "₹66,400", s: "78.4% margin" },
      ].map((c) => (
        <motion.div
          key={c.k}
          className={`${styles.card} ${styles.fanCard}`}
          initial={{ opacity: 0, y: 120, rotate: 0 }}
          animate={{ opacity: 1, x: c.x, y: c.y, rotate: c.r }}
          transition={{ duration: 1.3, delay: c.d, ease: EASE }}
        >
          <p className={styles.k}>{c.k}</p>
          <p className={styles.v}>{c.v}</p>
          <p className={styles.up}>{c.s}</p>
        </motion.div>
      ))}
      <ul className={styles.checklist}>
        {SETUP.map((s, i) => (
          <motion.li key={s.t} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 1 + i * 0.25, ease: EASE }}>
            <span className={styles.ico}>
              <s.icon size={15} />
            </span>
            {s.t}
            <motion.i initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8 + i * 0.5, type: "spring", stiffness: 400, damping: 15 }}>
              <Check size={12} strokeWidth={3} />
            </motion.i>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// ---------------- Verify: shield + code message ----------------
function Verify() {
  const reduce = useReducedMotion();
  return (
    <div className={styles.center}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={styles.ring}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={reduce ? { scale: 1, opacity: 0.3 } : { scale: [0.6, 1.9], opacity: [0.5, 0] }}
          transition={{ duration: 4.5, delay: i * 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <motion.div className={styles.shield} initial={{ scale: 0.6, opacity: 0, rotate: -8 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 1.2, ease: EASE }}>
        <svg viewBox="0 0 120 140" fill="none">
          <path d="M60 6 108 24v38c0 33-20 58-48 72C32 120 12 95 12 62V24L60 6Z" fill="url(#sg)" stroke="rgba(199,255,69,.6)" strokeWidth="1.5" />
          <motion.path d="M38 70l16 16 30-34" stroke="var(--volt)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 1, ease: EASE }} />
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="rgba(199,255,69,.22)" />
              <stop offset="1" stopColor="rgba(199,255,69,.02)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      <Float className={`${styles.card} ${styles.msg}`} delay={0.7} y={7}>
        <p className={styles.k}>
          <Mail size={12} /> WashFlow · now
        </p>
        <p className={styles.code}>
          Your code is <b>123 456</b>
        </p>
        <p className={styles.foot}>Demo mode — no message is actually sent.</p>
      </Float>
    </div>
  );
}

// ---------------- Success: burst + clean car ----------------
const CONFETTI = Array.from({ length: 22 }, (_, i) => {
  const a = (i / 22) * Math.PI * 2;
  const d = 130 + ((i * 29) % 90);
  return { x: Math.cos(a) * d, y: Math.sin(a) * d - 20, r: (i * 47) % 360, c: i % 3 === 0 ? "var(--volt)" : i % 3 === 1 ? "#fff" : "var(--cyan)", w: 6 + (i % 4) * 3 };
});

function Success() {
  return (
    <div className={styles.center}>
      <div className={styles.glowDisc} />
      {CONFETTI.map((c, i) => (
        <motion.span
          key={i}
          className={styles.confetti}
          style={{ background: c.c, width: c.w, height: c.w * 0.4 }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: c.x, y: [0, c.y, c.y + 60], opacity: [0, 1, 0], scale: 1, rotate: c.r + 240 }}
          transition={{ duration: 2.2, delay: 0.9 + (i % 5) * 0.04, ease: EASE }}
        />
      ))}
      <motion.div className={styles.seal} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}>
        <svg viewBox="0 0 120 120" fill="none">
          <motion.circle cx="60" cy="60" r="54" stroke="var(--volt)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.3, ease: EASE }} />
          <motion.path d="M36 62l16 16 32-36" stroke="var(--volt)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.9, ease: EASE }} />
        </svg>
      </motion.div>
      <Float className={`${styles.card} ${styles.chip}`} delay={1.4} y={6}>
        <p className={styles.k}>
          <Droplets size={12} /> Workspace ready
        </p>
        <p className={styles.foot}>
          <ShieldCheck size={13} /> Email verified
        </p>
      </Float>
    </div>
  );
}

const PHOTO: Record<ArtKind, Photo> = {
  signin: PHOTOS.signIn,
  signup: PHOTOS.signUp,
  verify: PHOTOS.verify,
  success: PHOTOS.success,
};

/** Full-bleed photograph that slowly settles in (scale + exposure). */
function Backdrop({ kind }: { kind: ArtKind }) {
  const reduce = useReducedMotion();
  const p = PHOTO[kind];
  return (
    <motion.div
      className={`${styles.photo} ${styles[`photo_${kind}`]}`}
      initial={reduce ? false : { scale: 1.12, opacity: 0, filter: "brightness(0.4)" }}
      animate={{ scale: 1, opacity: 1, filter: "brightness(1)" }}
      transition={{ duration: 2.4, ease: EASE }}
    >
      <Image src={p.src} alt="" fill priority sizes="(min-width: 1024px) 52vw, 1px" quality={80} className={styles.photoImg} />
    </motion.div>
  );
}

export function AuthArt({ kind }: { kind: ArtKind }) {
  return (
    <div className={styles.art} key={kind}>
      <Backdrop kind={kind} />
      <div className={styles.scrim} />
      <Bubbles />
      {kind === "signin" && <SignIn />}
      {kind === "signup" && <SignUp />}
      {kind === "verify" && <Verify />}
      {kind === "success" && <Success />}
    </div>
  );
}
