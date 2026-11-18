import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { LegalPage } from "@/components/layout/LegalPage/LegalPage";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms that govern use of the WashFlow website and car wash management software.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updated="18 November 2026">
      <p>
        This page is a starting template and must be reviewed by your legal advisor before launch.
      </p>
      <h2>Using this website</h2>
      <p>
        Product screens, figures and names shown on this website are demo data for illustration. They are not real
        customer information or performance claims.
      </p>
      <h2>The service</h2>
      <p>
        Access to the WashFlow platform is provided under a separate subscription agreement agreed with each business.
      </p>
      <h2>Contact</h2>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalPage>
  );
}
