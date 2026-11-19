import { buildMetadata } from "@/lib/seo";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata = buildMetadata({
  title: "Create account",
  description: "Create your WashFlow account.",
  path: "/sign-up",
  noindex: true,
});

const STEPS = ["Account", "Verify", "Done"];

export default function SignUpPage() {
  return (
    <AuthShell
      art="signup"
      step={{ current: 1, total: 3, labels: STEPS }}
      eyebrow="Create your account"
      title={
        <>
          Start running it <em>properly.</em>
        </>
      }
      compact
      caption={{
        title: (
          <>
            From notebook to <em>dashboard</em> in an afternoon.
          </>
        ),
        text: "Washes, payments, customers and staff — set up once, tracked automatically.",
      }}
    >
      <SignUpForm />
    </AuthShell>
  );
}
