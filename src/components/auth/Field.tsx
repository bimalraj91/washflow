"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cx } from "@/lib/utils";
import styles from "./Form.module.scss";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  label: string;
  icon?: ReactNode;
  error?: string;
  hint?: string;
  action?: ReactNode;
};

/** Visible label, icon, inline error. Password inputs get a show/hide toggle. */
export function Field({ label, icon, error, hint, action, type = "text", ...rest }: Props) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  const msgId = `${id}-msg`;

  return (
    <div className={cx(styles.field, error && styles.invalid)}>
      <div className={styles.labelRow}>
        <label htmlFor={id}>{label}</label>
        {action}
      </div>
      <div className={styles.control}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          id={id}
          type={isPw && show ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error || hint ? msgId : undefined}
          {...rest}
        />
        {isPw && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {(error || hint) && (
        <p id={msgId} className={error ? styles.error : styles.hint} role={error ? "alert" : undefined}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
