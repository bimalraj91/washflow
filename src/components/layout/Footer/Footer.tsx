import Link from "next/link";
import { SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo/Logo";
import styles from "./Footer.module.scss";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Platform overview", href: "/#platform" },
      { label: "Dashboard", href: "/#platform" },
      { label: "Mobile preview", href: "/#mobile" },
      { label: "Payment demo", href: "/#payment-demo" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Wash & service tracking", href: "/#features" },
      { label: "Billing & transactions", href: "/#finance" },
      { label: "Customers & vehicles", href: "/#solutions" },
      { label: "Staff, salary & attendance", href: "/#team" },
      { label: "Reports & analytics", href: "/#insights" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Single-bay car washes", href: "/#benefits" },
      { label: "Detailing studios", href: "/#benefits" },
      { label: "Fleet & commercial washing", href: "/#benefits" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

const SOCIALS = ["LinkedIn", "Instagram", "YouTube", "X"];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link href="/" aria-label="WashFlow home">
              <Logo />
            </Link>
            <p className={styles.blurb}>
              Car wash management software for washes, billing, customers, teams and the numbers behind them.
            </p>
            <a href={`mailto:${SITE.email}`} className={styles.mail}>
              {SITE.email}
            </a>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className={styles.col}>
              <h2 className={styles.colTitle}>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={styles.link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className={styles.wordmark} aria-hidden="true">
          WASHFLOW
        </p>

        <div className={styles.bottom}>
          <p>
            © {year} {SITE.legalName}. All product screens show demo data.
          </p>
          <ul className={styles.legal}>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
          <ul className={styles.socials} aria-label="Social links (coming soon)">
            {SOCIALS.map((s) => (
              <li key={s}>
                <span title="Coming soon">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
