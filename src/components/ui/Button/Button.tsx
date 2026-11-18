import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cx } from "@/lib/utils";
import { Magnetic } from "./Magnetic";
import styles from "./Button.module.scss";

type Variant = "primary" | "ghost" | "text";
type Size = "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
};

type LinkProps = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className">;
type BtnProps = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className">;

/**
 * Pass `demo` (via data-demo-trigger) to open the Book-a-Demo dialog; the
 * underlying href still works without JavaScript.
 */
export function Button(props: LinkProps | BtnProps) {
  const { children, variant = "primary", size = "md", arrow, magnetic, className, ...rest } = props;
  const cls = cx(styles.btn, styles[variant], styles[size], className);

  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={2.2} />
          <ArrowUpRight size={16} strokeWidth={2.2} />
        </span>
      )}
    </>
  );

  const el =
    "href" in rest && rest.href !== undefined ? (
      <Link {...(rest as Omit<LinkProps, keyof BaseProps>)} className={cls}>
        {inner}
      </Link>
    ) : (
      <button type="button" {...(rest as Omit<BtnProps, keyof BaseProps>)} className={cls}>
        {inner}
      </button>
    );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
