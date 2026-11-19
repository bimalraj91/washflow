"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowRight, CalendarCheck, Smartphone, Users } from "lucide-react";
import { pending } from "@/lib/auth";
import { usePending } from "./usePending";
import btn from "@/components/ui/Button/Button.module.scss";
import { cx } from "@/lib/utils";
import styles from "./Success.module.scss";

const NEXT = [
  { icon: CalendarCheck, t: "Sign in to your workspace" },
  { icon: Users, t: "Add your bays and staff" },
  { icon: Smartphone, t: "Take your first payment" },
];

export function SuccessView() {
  const router = useRouter();
  const { ready, data: p, verified } = usePending();

  useEffect(() => {
    if (ready && !verified) router.replace("/sign-up");
  }, [ready, verified, router]);

  return (
    <div>
      {p && (
        <p className={styles.who}>
          <b>{p.business}</b> · {p.email}
        </p>
      )}
      <ul className={styles.next}>
        {NEXT.map((n, i) => (
          <li key={n.t} style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
            <span>
              <n.icon size={16} />
            </span>
            {n.t}
          </li>
        ))}
      </ul>
      <Link href="/sign-in?registered=1" onClick={() => pending.clear()} className={cx(btn.btn, btn.primary, btn.lg, styles.cta)}>
        <span className={btn.label}>Go to login</span>
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </div>
  );
}
