import type { Metadata } from "next";
import { FAQS, SITE } from "./constants";

export const KEYWORDS = [
  "car wash management software",
  "car wash billing software",
  "car wash customer management",
  "car wash service tracking software",
  "car wash employee management",
  "car wash income and expense management",
  "car wash payment tracking",
  "car wash business management system",
];

const DEFAULT_SOCIAL_TITLE = `${SITE.name} — Run your car wash, not your chaos`;
const BASE_OG = { type: "website", siteName: SITE.name, locale: SITE.locale } as const;

type PageSeo = {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
};

/** Page-level metadata built on the root defaults in app/layout.tsx. */
export function buildMetadata({ title, description, path = "/", noindex }: PageSeo = {}): Metadata {
  const desc = description ?? SITE.description;
  return {
    // Omit the key entirely when unset so the root title.default applies.
    ...(title ? { title } : {}),
    description: desc,
    alternates: { canonical: path },
    // Next shallow-merges metadata objects, so restate the shared OG fields.
    openGraph: {
      ...BASE_OG,
      title: title ? `${title} · ${SITE.name}` : DEFAULT_SOCIAL_TITLE,
      description: desc,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} · ${SITE.name}` : DEFAULT_SOCIAL_TITLE,
      description: desc,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Car Wash Management Software for Washes, Billing & Teams`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: KEYWORDS,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "Business Software",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    ...BASE_OG,
    url: "/",
    title: DEFAULT_SOCIAL_TITLE,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SOCIAL_TITLE,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export function homeJsonLd() {
  const org = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/icon.svg`,
    email: SITE.email,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      org,
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE.url}/#software`,
        name: SITE.name,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Car wash management software",
        operatingSystem: "Web browser",
        description: SITE.description,
        url: SITE.url,
        publisher: { "@id": `${SITE.url}/#organization` },
        featureList: [
          "Wash and service job tracking",
          "Transaction and payment method management",
          "Expense management and reports",
          "Vehicle profiles and wash history",
          "Customer ledger, dues and bulk payments",
          "Invoice sharing and payment reminders",
          "Employee, salary and attendance management",
          "Revenue, expense, service and salary reports",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** Serialise JSON-LD safely for a <script> tag. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
