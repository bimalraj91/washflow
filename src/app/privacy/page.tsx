import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { LegalPage } from "@/components/layout/LegalPage/LegalPage";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How WashFlow collects, uses and protects information on this website and in the car wash management platform.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="18 November 2026">
      <p>
        This page is a starting template and must be reviewed by your legal advisor before launch. It describes how{" "}
        {SITE.legalName} (&ldquo;WashFlow&rdquo;) handles information on this website.
      </p>
      <h2>Information we collect</h2>
      <p>
        When you request a demo we ask for your name, business name, phone number and number of wash bays. The demo
        form on this preview site does not transmit any data.
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>To contact you about the demo you requested.</li>
        <li>To understand which features matter to car wash businesses.</li>
      </ul>
      <h2>Product data</h2>
      <p>
        Business data you enter into the WashFlow platform — services, customers, vehicles, payments, employees and
        expenses — belongs to you and is processed only to provide the service.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about privacy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalPage>
  );
}
