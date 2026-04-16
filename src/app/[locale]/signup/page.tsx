"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, AlertCircle, Loader2, Mail } from "lucide-react";

export default function SignupPage() {
  const t = useTranslations("auth");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-neutral-50 min-h-screen">
        <div className="bg-gov-900 py-8 text-center text-white">
          <h1 className="text-2xl font-bold sm:text-3xl">{t("signup")}</h1>
        </div>
        <div className="mx-auto max-w-md px-4 py-12">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gov-100">
              <Mail className="h-10 w-10 text-gov-500" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">
              {t("checkEmail")}
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              {t("checkEmailDesc")}
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link href="/login">{t("login")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">{t("signup")}</h1>
        <p className="mt-2 text-neutral-300 text-sm">{t("signupSubtitle")}</p>
      </div>

      <div className="mx-auto max-w-md px-4 py-12">
        <form
          onSubmit={handleSignup}
          className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("signingUp")}
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  {t("signup")}
                </>
              )}
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-neutral-500">
            {t("haveAccount")}{" "}
            <Link
              href="/login"
              className="font-medium text-gov-500 hover:text-gov-600"
            >
              {t("login")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
