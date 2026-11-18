import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/LegalPage/LegalPage";
import { Button } from "@/components/ui/Button/Button";

export const metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in to your WashFlow workspace.",
  path: "/sign-in",
  noindex: true,
});

export default function SignInPage() {
  return (
    <LegalPage title="Sign in" path="/sign-in">
      <p>The customer workspace is opening to businesses in stages. Book a demo and we&apos;ll set up your account.</p>
      <p style={{ marginTop: "2rem" }}>
        <Button href="/#book-demo" data-demo-trigger="" arrow>
          Book a demo
        </Button>
      </p>
    </LegalPage>
  );
}
