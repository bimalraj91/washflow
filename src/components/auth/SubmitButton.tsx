import { ArrowRight, Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import btn from "@/components/ui/Button/Button.module.scss";
import styles from "./Form.module.scss";

/** Primary pill submit with a loading state that keeps its width. */
export function SubmitButton({ loading, children, disabled }: { loading?: boolean; children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="submit"
      className={cx(btn.btn, btn.primary, btn.lg, styles.submit)}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
    >
      <span className={btn.label}>{loading ? "Please wait…" : children}</span>
      {loading ? <Loader2 size={18} className={styles.spin} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
    </button>
  );
}
