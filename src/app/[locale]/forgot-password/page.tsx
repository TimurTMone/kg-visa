"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network delay for demo; always show success to prevent email enumeration
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent to your email");
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">Reset Password</h1>
        <p className="mt-2 text-neutral-300 text-sm">
          Enter your email to receive a password reset link
        </p>
      </div>

      <div className="mx-auto max-w-md px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {sent ? (
            <div className="text-center py-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-neutral-900 mb-2">
                Check Your Email
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                If an account exists with <span className="font-medium">{email}</span>,
                you will receive a password reset link shortly. Please check your inbox
                and spam folder.
              </p>
              <p className="text-xs text-neutral-400">
                Did not receive the email? Wait a few minutes and try again, or contact
                support at support@evisa.kg.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="text-center mb-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gov-100 mb-3">
                  <KeyRound className="h-6 w-6 text-gov-600" />
                </div>
                <p className="text-sm text-neutral-600">
                  Enter the email address associated with your account and we will send
                  you a link to reset your password.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  autoFocus
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gov-500 hover:text-gov-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to {t("login")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
