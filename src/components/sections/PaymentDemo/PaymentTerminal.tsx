"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Banknote, Check, CreditCard, Landmark, Share2, Smartphone, X } from "lucide-react";
import { cx, formatINR } from "@/lib/utils";
import styles from "./PaymentDemo.module.scss";

const SERVICES = [
  { id: "express", name: "Express Exterior", price: 450 },
  { id: "premium", name: "Premium Wash", price: 899 },
  { id: "ceramic", name: "Ceramic Foam Wash", price: 1499 },
];

const METHODS = [
  { id: "UPI", Icon: Smartphone },
  { id: "Cash", Icon: Banknote },
  { id: "Card", Icon: CreditCard },
  { id: "Bank", Icon: Landmark },
] as const;

const PREV_DUE = 3299;

export function PaymentTerminal() {
  const [service, setService] = useState(SERVICES[2]);
  const [method, setMethod] = useState<(typeof METHODS)[number]["id"]>("UPI");
  const [includeDue, setIncludeDue] = useState(true);
  const [paid, setPaid] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const svcId = useId();
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  // Tactile feedback on touch devices; ignored where unsupported.
  const haptic = (ms = 12) => {
    try {
      navigator.vibrate?.(ms);
    } catch {
      /* not supported */
    }
  };
  const tap = reduce ? undefined : { scale: 0.96 };

  const total = service.price + (includeDue ? PREV_DUE : 0);

  const notify = (msg: string) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2800);
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.tHead}>
        <div>
          <p className={styles.tLabel}>Customer</p>
          <p className={styles.tName}>Arjun Menon</p>
        </div>
        <span className={styles.tPlate}>KL 07 CK 4821</span>
        <AnimatePresence>
          {paid && (
            <motion.span
              key="stamp"
              className={styles.stamp}
              aria-hidden="true"
              initial={reduce ? { opacity: 0 } : { scale: 2.4, opacity: 0, rotate: -22 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 380, damping: 20 }}
            >
              <Check size={13} strokeWidth={3} /> Paid
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.tLabel} id={svcId}>
          Wash service
        </legend>
        <div className={styles.services}>
          {SERVICES.map((s) => (
            <motion.label key={s.id} whileTap={tap} className={cx(styles.svc, service.id === s.id && styles.svcOn)}>
              <input type="radio" name="svc" value={s.id} checked={service.id === s.id} onChange={() => { setService(s); setPaid(false); }} />
              <span>{s.name}</span>
              <b className="tabular">{formatINR(s.price)}</b>
            </motion.label>
          ))}
        </div>
      </fieldset>

      <dl className={styles.sum}>
        <div>
          <dt>Service amount</dt>
          <dd className="tabular">{formatINR(service.price)}</dd>
        </div>
        <div>
          <dt>
            <label className={styles.dueToggle}>
              <input type="checkbox" checked={includeDue} onChange={(e) => { setIncludeDue(e.target.checked); setPaid(false); }} />
              <span className={styles.check} aria-hidden="true">
                {includeDue && <Check size={11} strokeWidth={3} />}
              </span>
              Previous due
            </label>
          </dt>
          <dd className={cx("tabular", includeDue ? styles.dueOn : styles.dueOff)}>{formatINR(PREV_DUE)}</dd>
        </div>
        <div className={styles.totalRow}>
          <dt>Total amount</dt>
          <dd>
            <motion.span key={total} initial={reduce ? false : { opacity: 0, y: 10, scale: 1.08 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="tabular" style={{ display: "inline-block", transformOrigin: "right center" }}>
              {formatINR(total)}
            </motion.span>
          </dd>
        </div>
      </dl>

      <fieldset className={styles.group}>
        <legend className={styles.tLabel}>Payment method</legend>
        <div className={styles.methods}>
          {METHODS.map(({ id, Icon }) => (
            <motion.label key={id} whileTap={tap} className={cx(styles.method, method === id && styles.methodOn)}>
              <input type="radio" name="method" value={id} checked={method === id} onChange={() => { setMethod(id); setPaid(false); haptic(8); }} />
              <Icon size={18} aria-hidden="true" />
              <span>{id}</span>
            </motion.label>
          ))}
        </div>
      </fieldset>

      <div className={styles.statusRow}>
        <span className={styles.tLabel} id="pay-status-label">
          Payment status
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={paid}
          aria-labelledby="pay-status-label"
          className={cx(styles.switch, paid && styles.switchOn)}
          onClick={() => {
            setPaid((p) => !p);
            if (!paid) {
              notify(`${formatINR(total)} recorded via ${method}`);
              haptic(18);
            }
          }}
        >
          {/* success pulse radiating from the switch */}
          <AnimatePresence>
            {paid && !reduce && (
              <motion.span
                key="pulse"
                className={styles.pulse}
                initial={{ opacity: 0.7, scale: 1 }}
                animate={{ opacity: 0, scale: 1.55 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </AnimatePresence>
          <span className={styles.switchText}>{paid ? "Paid" : "Pending"}</span>
          <motion.span layout className={styles.knob} transition={{ type: "spring", stiffness: 500, damping: 32 }}>
            {paid ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
          </motion.span>
        </button>
      </div>

      <button type="button" className={styles.share} onClick={() => notify("Invoice INV-2611-0482 shared with Arjun")}>
        <Share2 size={16} aria-hidden="true" /> Share invoice
      </button>

      <div className={styles.toastWrap} aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.p
              key={toast}
              className={styles.toast}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.toastIcon}>
                <Check size={13} strokeWidth={3} />
              </span>
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
