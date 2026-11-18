"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { z } from "zod";
import { useLenis } from "@/lib/animations/lenis";
import styles from "./DemoDialog.module.scss";

const schema = z.object({
  name: z.string().trim().min(2, "Add your name so we know who to ask for."),
  business: z.string().trim().min(2, "Add your car wash or business name."),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{8,15}$/, "Use a phone number like +91 98765 43210."),
  bays: z.string().min(1, "Pick the closest option."),
});

type Fields = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Fields, string>>;

/**
 * Book-a-Demo dialog. Any element with [data-demo-trigger] opens it (links
 * keep a real href, so the page still works without JS). Front-end only.
 */
export function DemoDialog() {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-demo-trigger]");
      if (!t) return;
      e.preventDefault();
      lastFocus.current = t;
      setSent(false);
      setErrors({});
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("input")?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const f = Array.from(panelRef.current.querySelectorAll<HTMLElement>("button, input, select, a[href]"));
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      lastFocus.current?.focus();
    };
  }, [open, lenis]);

  const validateField = (name: keyof Fields, value: string) => {
    const r = schema.shape[name].safeParse(value);
    setErrors((prev) => ({ ...prev, [name]: r.success ? undefined : r.error.issues[0]?.message }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      const next: Errors = {};
      r.error.issues.forEach((i) => {
        const k = i.path[0] as keyof Fields;
        next[k] ??= i.message;
      });
      setErrors(next);
      const firstBad = Object.keys(next)[0];
      panelRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setSent(true);
  };

  const field = (name: keyof Fields, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className={styles.field}>
      <label htmlFor={`demo-${name}`}>{label}</label>
      <input
        id={`demo-${name}`}
        name={name}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `demo-${name}-err` : undefined}
        onBlur={(e) => validateField(name, e.target.value)}
        onChange={(e) => errors[name] && validateField(name, e.target.value)}
        {...props}
      />
      {errors[name] && (
        <p id={`demo-${name}-err`} className={styles.error}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          data-lenis-prevent=""
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={styles.panel}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close dialog">
              <X size={18} />
            </button>

            {sent ? (
              <div className={styles.success} role="status">
                <motion.span
                  className={styles.tick}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <Check size={28} strokeWidth={2.6} />
                </motion.span>
                <h2 id={titleId}>Request received</h2>
                <p>
                  This is a front-end preview, so nothing was sent. In production, our team would call you within
                  one working day to schedule a walkthrough.
                </p>
                <button type="button" className={styles.submit} onClick={() => setOpen(false)}>
                  Back to the site
                </button>
              </div>
            ) : (
              <>
                <p className={styles.eyebrow}>Book a demo · 30 minutes</p>
                <h2 id={titleId} className={styles.title}>
                  See WashFlow run <span className="volt">your</span> car wash.
                </h2>
                <form className={styles.form} onSubmit={onSubmit} noValidate>
                  {field("name", "Your name", { autoComplete: "name", placeholder: "" })}
                  {field("business", "Business name", { autoComplete: "organization" })}
                  {field("phone", "Phone", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "+91 98765 43210" })}
                  <div className={styles.field}>
                    <label htmlFor="demo-bays">Wash bays</label>
                    <select
                      id="demo-bays"
                      name="bays"
                      defaultValue="1–2"
                      aria-invalid={!!errors.bays}
                      onChange={(e) => validateField("bays", e.target.value)}
                    >
                      <option>1–2</option>
                      <option>3–5</option>
                      <option>6–10</option>
                      <option>More than 10</option>
                    </select>
                  </div>
                  <button type="submit" className={styles.submit}>
                    Request my demo
                  </button>
                  <p className={styles.note}>Preview form — no data leaves your browser.</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
