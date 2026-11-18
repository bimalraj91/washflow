import { Check, Circle, Clock, Loader, Plus, AlertCircle } from "lucide-react";
import { cx } from "@/lib/utils";
import styles from "./StatusChip.module.scss";

export type Status = "new" | "progress" | "waiting" | "completed" | "paid" | "pending" | "absent";

const MAP: Record<Status, { label: string; Icon: typeof Check }> = {
  new: { label: "New", Icon: Plus },
  progress: { label: "In Progress", Icon: Loader },
  waiting: { label: "Waiting", Icon: Clock },
  completed: { label: "Completed", Icon: Check },
  paid: { label: "Paid", Icon: Check },
  pending: { label: "Pending", Icon: AlertCircle },
  absent: { label: "Absent", Icon: Circle },
};

/** Status is carried by icon + text, colour is reinforcement only. */
export function StatusChip({ status, label, className }: { status: Status; label?: string; className?: string }) {
  const { label: l, Icon } = MAP[status];
  return (
    <span className={cx(styles.chip, styles[status], className)}>
      <Icon size={11} strokeWidth={2.6} aria-hidden="true" className={status === "progress" ? styles.spin : undefined} />
      {label ?? l}
    </span>
  );
}
