"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Info, Lock, Mail } from "lucide-react";
import { fieldErrors, signInSchema } from "@/lib/auth";
import { cx } from "@/lib/utils";
import { Field } from "./Field";
import { SubmitButton } from "./SubmitButton";
import styles from "./Form.module.scss";

export function SignInForm({ registered }: { registered?: boolean }) {
  const [v, setV] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const all = fieldErrors(signInSchema.safeParse(v));
  const err = (k: keyof typeof v) => (touched[k] ? all[k] : undefined);
  const bind = (k: keyof typeof v) => ({
    value: v[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setV((s) => ({ ...s, [k]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (Object.keys(all).length) return;
    setLoading(true);
    // Demo mode: no auth backend yet.
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1100);
  }

  return (
    <>
      {registered && (
        <div className={cx(styles.banner, styles.bannerOk)} role="status" style={{ marginBottom: "1.25rem" }}>
          <CheckCircle2 size={18} />
          <span>
            <b>Account created.</b> Sign in with the email and password you just set.
          </span>
        </div>
      )}
      <form className={styles.form} onSubmit={submit} noValidate>
        <Field label="Work email" type="email" autoComplete="email" placeholder="you@carwash.in" icon={<Mail size={16} />} error={err("email")} {...bind("email")} />
        <Field
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          icon={<Lock size={16} />}
          error={err("password")}
          {...bind("password")}
        />
        {done && (
          <div className={cx(styles.banner, styles.bannerInfo)} role="status">
            <Info size={18} />
            <span>
              <b>Preview only.</b> Sign-in isn&apos;t connected to a backend yet, so no workspace opens. <Link href="/sign-up" style={{ textDecoration: "underline" }}>Create an account</Link> to try the full registration flow.
            </span>
          </div>
        )}
        <SubmitButton loading={loading}>Sign in</SubmitButton>
      </form>
      <p className={styles.alt}>
        New to WashFlow? <Link href="/sign-up">Create an account</Link>
      </p>
    </>
  );
}
