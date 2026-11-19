import { buildMetadata } from "@/lib/seo";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in to your WashFlow workspace.",
  path: "/sign-in",
  noindex: true,
});

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ registered?: string }> }) {
  const { registered } = await searchParams;
  return (
    <AuthShell
      art="signin"
      eyebrow="Welcome back"
      title={
        <>
          Back on the <em>floor.</em>
        </>
      }
      lead="Sign in to see today's washes, dues and revenue."
      caption={{
        title: (
          <>
            Every bay, every rupee, <em>in one place.</em>
          </>
        ),
        text: "Your car wash keeps moving while you're away. WashFlow keeps the numbers straight.",
      }}
    >
      <SignInForm registered={registered === "1"} />
    </AuthShell>
  );
}
