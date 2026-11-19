"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { cx } from "@/lib/utils";
import { useLenis } from "@/lib/animations/lenis";
import { Logo } from "@/components/ui/Logo/Logo";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: every homepage section maps to a nav group (or none).
  useEffect(() => {
    const GROUP: Record<string, string> = {
      platform: "platform",
      features: "features",
      finance: "features",
      solutions: "solutions",
      team: "solutions",
      insights: "insights",
      pricing: "pricing",
    };
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(GROUP[e.target.id] ?? null);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Mobile menu: lock scroll, Escape closes, focus moves in and returns.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && menuRef.current) {
        const f = menuRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          toggle?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          toggle?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      toggle?.focus();
    };
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <header className={cx(styles.nav, (scrolled || open) && styles.scrolled)}>
      <div className={cx("container", styles.inner)}>
        <Link href="/" className={styles.brand} aria-label="WashFlow home" onClick={close}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className={styles.center}>
          <ul className={styles.links}>
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={l.href} className={styles.link} aria-current={active === l.id ? "true" : undefined}>
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className={styles.indicator}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={styles.linkText}>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/sign-in" className={styles.signin}>
            Sign in
          </Link>
          <Button href="/sign-up" className={styles.cta} magnetic>
            Get started
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className={cx(styles.toggle, open && styles.toggleOpen)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className={styles.mobile}
            initial={{ opacity: 0, clipPath: reduce ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: reduce ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile">
              <motion.ul
                className={styles.mobileLinks}
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.12 } } }}
              >
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    variants={{ hidden: { opacity: 0, y: reduce ? 0 : 28 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a href={l.href} onClick={close} className={styles.mobileLink}>
                      <span className={styles.mobileIdx}>0{i + 1}</span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
            <motion.div
              className={styles.mobileFoot}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.35 } }}
            >
              <Button href="/sign-in" variant="ghost" size="lg" onClick={close}>
                Sign in
              </Button>
              <Button href="/sign-up" size="lg" arrow onClick={close}>
                Get started
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
