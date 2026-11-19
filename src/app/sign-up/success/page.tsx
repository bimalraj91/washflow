import { buildMetadata } from "@/lib/seo";
import { AuthShell } from "@/components/auth/AuthShell";
import { SuccessView } from "@/components/auth/SuccessView";

export const metadata = buildMetadata({
  title: "Registration complete",
  description: "Your WashFlow account is ready.",
  path: "/sign-up/success",
  noindex: true,
});

export default function SuccessPage() {
  return (
    <AuthShell
      art="success"
      step={{ current: 4, total: 3, labels: ["Account", "Verify", "Done"] }}
      eyebrow="Registration complete"
      title={
        <>
          You&apos;re all <em>set.</em>
        </>
      }
      lead="Your account is verified and ready. Sign in to open your workspace."
      caption={{
        title: (
          <>
            Fresh, clean and <em>ready to roll.</em>
          </>
        ),
        text: "Welcome to WashFlow. Your first wash is one login away.",
      }}
    >
      <SuccessView />
    </AuthShell>
  );
}
