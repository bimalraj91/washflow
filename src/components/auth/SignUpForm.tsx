"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Check, Lock, Mail, Phone, Store, User } from "lucide-react";
import { fieldErrors, passwordStrength, pending, signUpSchema } from "@/lib/auth";
import { Field } from "./Field";
import { SubmitButton } from "./SubmitButton";
import styles from "./Form.module.scss";

type Values = { name: string; business: string; email: string; phone: string; password: string; terms: boolean };
const LEVELS = ["", "Weak", "Fair", "Good", "Strong"];
const COLORS = ["", "var(--red)", "var(--amber)", "var(--sage)", "var(--volt)"];

export function SignUpForm() {
  const router = useRouter();
  const [v, setV] = useState<Values>({ name: "", business: "", email: "", phone: "", password: "", terms: false });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const all = fieldErrors(signUpSchema.safeParse(v));
  const err = (k: keyof Values) => (touched[k] ? all[k] : undefined);
  const bind = (k: Exclude<keyof Values, "terms">) => ({
    value: v[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setV((s) => ({ ...s, [k]: k === "phone" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
  });
  const strength = passwordStrength(v.password);

  function submit(e: FormEvent) {
    e.preventDefault();
    setTouched({ name: true, business: true, email: true, phone: true, password: true, terms: true });
    if (Object.keys(all).length) return;
    setLoading(true);
    pending.clear();
    pending.set({ name: v.name.trim(), business: v.business.trim(), email: v.email.trim(), phone: v.phone });
    setTimeout(() => router.push("/sign-up/verify"), 700);
  }

  return (
    <>
      <form className={styles.form} onSubmit={submit} noValidate>
        <div className={styles.row2}>
          <Field label="Full name" autoComplete="name" placeholder="Rahul Menon" icon={<User size={16} />} error={err("name")} {...bind("name")} />
          <Field label="Car wash name" autoComplete="organization" placeholder="Sparkle Studio" icon={<Store size={16} />} error={err("business")} {...bind("business")} />
        </div>
        <div className={styles.row2}>
        <Field label="Work email" type="email" autoComplete="email" placeholder="you@carwash.in" icon={<Mail size={16} />} error={err("email")} {...bind("email")} />
        <Field label="Mobile number" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" icon={<Phone size={16} />} error={err("phone")} {...bind("phone")} />
        </div>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <Field
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="8+ characters with a number"
            icon={<Lock size={16} />}
            error={err("password")}
            {...bind("password")}
          />
          <div className={styles.meter} aria-hidden="true">
            {[1, 2, 3, 4].map((n) => (
              <i key={n} style={strength >= n ? { background: COLORS[strength] } : undefined} />
            ))}
            <span>{v.password ? LEVELS[strength] || "Weak" : ""}</span>
          </div>
        </div>

        <div>
          <label className={styles.check}>
            <input type="checkbox" checked={v.terms} onChange={(e) => setV((s) => ({ ...s, terms: e.target.checked }))} onBlur={() => setTouched((t) => ({ ...t, terms: true }))} aria-invalid={!!err("terms")} />
            <span className={styles.box}>
              <Check size={13} strokeWidth={3} />
            </span>
            <span>
              I agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
            </span>
          </label>
          {err("terms") && (
            <p className={styles.error} role="alert" style={{ marginTop: "0.45rem" }}>
              {err("terms")}
            </p>
          )}
        </div>

        <SubmitButton loading={loading}>Create account</SubmitButton>
      </form>
      <p className={styles.alt}>
        Already have an account? <Link href="/sign-in">Sign in</Link>
      </p>
    </>
  );
}
