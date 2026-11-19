import { buildMetadata } from "@/lib/seo";
import { AuthShell } from "@/components/auth/AuthShell";
import { OtpForm } from "@/components/auth/OtpForm";

export const metadata = buildMetadata({
  title: "Verify your email",
  description: "Enter the 6-digit code to verify your WashFlow account.",
  path: "/sign-up/verify",
  noindex: true,
});

export default function VerifyPage() {
  return (
    <AuthShell
      art="verify"
      step={{ current: 2, total: 3, labels: ["Account", "Verify", "Done"] }}
      back={{ href: "/sign-up", label: "Edit details" }}
      eyebrow="Verify it's you"
      title={
        <>
          Check your <em>inbox.</em>
        </>
      }
      lead="Enter the 6-digit code we sent to confirm your email."
      caption={{
        title: (
          <>
            One quick check, then <em>you&apos;re in.</em>
          </>
        ),
        text: "We verify every account so your customer and payment records stay yours alone.",
      }}
    >
      <OtpForm />
    </AuthShell>
  );
}
