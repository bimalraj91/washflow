"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { DEMO_OTP, maskEmail, pending } from "@/lib/auth";
import { usePending } from "./usePending";
import { cx } from "@/lib/utils";
import { SubmitButton } from "./SubmitButton";
import styles from "./Form.module.scss";
import otp from "./Otp.module.scss";

const LEN = 6;
const RESEND = 30;

export function OtpForm() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useState(RESEND);
  const [sent, setSent] = useState(false);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const shake = useAnimationControls();

  // Guard: this step only makes sense after sign-up.
  const { ready, data } = usePending();
  const email = data?.email ?? null;
  useEffect(() => {
    if (ready && !data) router.replace("/sign-up");
  }, [ready, data, router]);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const code = digits.join("");

  function commit(next: string[]) {
    setError("");
    setDigits(next);
    if (next.every(Boolean)) verify(next.join(""));
  }

  function onChange(i: number, raw: string) {
    const val = raw.replace(/\D/g, "");
    if (val.length > 1) return fill(val, i);
    commit(digits.map((x, j) => (j === i ? val : x)));
    if (val && i < LEN - 1) refs.current[i + 1]?.focus();
  }

  function fill(text: string, from = 0) {
    const chars = text.replace(/\D/g, "").slice(0, LEN - from).split("");
    if (!chars.length) return;
    commit(digits.map((x, j) => (j >= from && chars[j - from] ? chars[j - from] : x)));
    refs.current[Math.min(from + chars.length, LEN - 1)]?.focus();
  }

  function onKey(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < LEN - 1) refs.current[i + 1]?.focus();
  }

  function onPaste(e: ClipboardEvent) {
    e.preventDefault();
    fill(e.clipboardData.getData("text"));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    verify(code);
  }

  function verify(code: string) {
    if (loading) return;
    if (code.length < LEN) {
      setError("Enter all 6 digits.");
      shake.start({ x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.45 } });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (code === DEMO_OTP) {
        pending.markVerified();
        router.push("/sign-up/success");
      } else {
        setLoading(false);
        setError("That code doesn't match. Check it and try again.");
        setDigits(Array(LEN).fill(""));
        refs.current[0]?.focus();
        shake.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.5 } });
      }
    }, 900);
  }

  function resend() {
    setLeft(RESEND);
    setSent(true);
    setDigits(Array(LEN).fill(""));
    setError("");
    refs.current[0]?.focus();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <p className={otp.to}>
        Code sent to <b>{email ? maskEmail(email) : "your email"}</b> · <Link href="/sign-up">Change</Link>
      </p>

      <motion.div animate={shake} className={otp.boxes} role="group" aria-label="6-digit verification code">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={cx(otp.box, d && otp.filled, error && otp.bad)}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={LEN}
            value={d}
            aria-label={`Digit ${i + 1}`}
            aria-invalid={!!error}
            autoFocus={i === 0}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKey(i, e)}
            onPaste={onPaste}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </motion.div>

      <div className={otp.status} aria-live="polite">
        {error ? <p className={styles.error}>{error}</p> : sent ? <p className={styles.hint}>A new code is on its way.</p> : null}
      </div>

      <p className={otp.demo}>
        <span>Demo mode</span> No message is sent. Use code <b>{DEMO_OTP}</b>.
      </p>

      <SubmitButton loading={loading}>Verify and continue</SubmitButton>

      <p className={styles.alt} style={{ marginTop: "0.5rem" }}>
        {left > 0 ? (
          <>
            Resend code in <b style={{ color: "var(--text)", fontVariantNumeric: "tabular-nums" }}>0:{String(left).padStart(2, "0")}</b>
          </>
        ) : (
          <>
            Didn&apos;t get it?{" "}
            <button type="button" onClick={resend} style={{ color: "var(--text)", fontWeight: 550, borderBottom: "1px solid var(--volt)" }}>
              Resend code
            </button>
          </>
        )}
      </p>
    </form>
  );
}
