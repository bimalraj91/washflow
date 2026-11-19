import { z } from "zod";

export const emailSchema = z.email("Enter a valid email, like you@carwash.in");

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password"),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  business: z.string().trim().min(2, "Enter your car wash name"),
  email: emailSchema,
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number"),
  password: z
    .string()
    .min(8, "Use at least 8 characters")
    .regex(/[A-Za-z]/, "Add at least one letter")
    .regex(/\d/, "Add at least one number"),
  terms: z.literal(true, "Accept the terms to continue"),
});

/** Flatten zod issues into { field: firstMessage }. */
export function fieldErrors(result: { success: boolean; error?: z.ZodError }) {
  const out: Record<string, string> = {};
  if (!result.success && result.error) {
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !out[key]) out[key] = issue.message;
    }
  }
  return out;
}

/** 0–4 password strength for the meter. */
export function passwordStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

// ---- Demo-mode session hand-off between the sign-up steps ----
// There is no backend yet: the steps pass data through sessionStorage and the
// OTP step checks a fixed demo code. Replace these with real API calls.
export const DEMO_OTP = "123456";
const PENDING = "wf-signup-pending";
const VERIFIED = "wf-signup-verified";

export type Pending = { name: string; business: string; email: string; phone: string };

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export const pending = {
  set: (p: Pending) => safe(() => sessionStorage.setItem(PENDING, JSON.stringify(p)), undefined),
  get: (): Pending | null => safe(() => JSON.parse(sessionStorage.getItem(PENDING) || "null"), null),
  markVerified: () => safe(() => sessionStorage.setItem(VERIFIED, "1"), undefined),
  isVerified: () => safe(() => sessionStorage.getItem(VERIFIED) === "1", false),
  clear: () =>
    safe(() => {
      sessionStorage.removeItem(PENDING);
      sessionStorage.removeItem(VERIFIED);
    }, undefined),
};

export function maskEmail(email: string) {
  const [u, d] = email.split("@");
  if (!d) return email;
  return `${u.slice(0, 2)}${"•".repeat(Math.max(2, u.length - 2))}@${d}`;
}
