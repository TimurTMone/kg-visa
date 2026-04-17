"use client";

import { useState, Suspense } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api, setToken } from "@/lib/api";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { access_token } = await api.auth.login(email, password);
      setToken(access_token);
      toast.success(t("welcomeBack"));
      window.location.href = redirectTo;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">{t("login")}</h1>
        <p className="mt-2 text-neutral-300 text-sm">{t("loginSubtitle")}</p>
      </div>

      <div className="mx-auto max-w-md px-4 py-12">
        <form
          onSubmit={handleLogin}
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
                  {t("loggingIn")}
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  {t("login")}
                </>
              )}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-neutral-400 hover:text-gov-500 transition-colors"
            >
              {t("forgotPassword")}
            </Link>
          </div>

          <p className="mt-4 text-center text-sm text-neutral-500">
            {t("noAccount")}{" "}
            <Link
              href="/signup"
              className="font-medium text-gov-500 hover:text-gov-600"
            >
              {t("signup")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
