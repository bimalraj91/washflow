"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  const total = service.price + (includeDue ? PREV_DUE : 0);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((t) => (t === msg ? null : t)), 2800);
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.tHead}>
        <div>
          <p className={styles.tLabel}>Customer</p>
          <p className={styles.tName}>Arjun Menon</p>
        </div>
        <span className={styles.tPlate}>KL 07 CK 4821</span>
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.tLabel} id={svcId}>
          Wash service
        </legend>
        <div className={styles.services}>
          {SERVICES.map((s) => (
            <label key={s.id} className={cx(styles.svc, service.id === s.id && styles.svcOn)}>
              <input type="radio" name="svc" value={s.id} checked={service.id === s.id} onChange={() => { setService(s); setPaid(false); }} />
              <span>{s.name}</span>
              <b className="tabular">{formatINR(s.price)}</b>
            </label>
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
            <motion.span key={total} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="tabular">
              {formatINR(total)}
            </motion.span>
          </dd>
        </div>
      </dl>

      <fieldset className={styles.group}>
        <legend className={styles.tLabel}>Payment method</legend>
        <div className={styles.methods}>
          {METHODS.map(({ id, Icon }) => (
            <label key={id} className={cx(styles.method, method === id && styles.methodOn)}>
              <input type="radio" name="method" value={id} checked={method === id} onChange={() => setMethod(id)} />
              <Icon size={18} aria-hidden="true" />
              <span>{id}</span>
            </label>
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
            if (!paid) notify(`${formatINR(total)} recorded via ${method}`);
          }}
        >
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
