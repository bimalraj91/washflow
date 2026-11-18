import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { jsonLdString } from "@/lib/seo";
import styles from "./LegalPage.module.scss";

type Props = { title: string; path: string; updated?: string; children: ReactNode };

/** Shared shell for simple text pages: breadcrumb (visible + JSON-LD), title, prose. */
export function LegalPage({ title, path, updated, children }: Props) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: title, item: `${SITE.url}${path}` },
    ],
  };

  return (
    <article className={`container ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }} />
      <nav aria-label="Breadcrumb" className={styles.crumbs}>
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <h1 className={styles.title}>{title}</h1>
      {updated && <p className={styles.updated}>Last updated {updated}</p>}
      <div className={styles.prose}>{children}</div>
    </article>
  );
}
