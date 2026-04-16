"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Search,
  CheckCircle2,
  Clock,
  FileCheck,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Status = "submitted" | "review" | "approved" | "issued";

const DEMO_STATUSES: { step: Status; icon: typeof Send; date: string }[] = [
  { step: "submitted", icon: Send, date: "2026-04-10" },
  { step: "review", icon: Clock, date: "2026-04-11" },
  { step: "approved", icon: CheckCircle2, date: "2026-04-13" },
  { step: "issued", icon: FileCheck, date: "2026-04-13" },
];

export default function StatusPage() {
  const t = useTranslations("status");
  const common = useTranslations("common");
  const [result, setResult] = useState<"idle" | "loading" | "found" | "notFound">("idle");
  const [appId, setAppId] = useState("");
  const [email, setEmail] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId || !email) return;

    setResult("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    // Demo: show results if any input is given, otherwise not found
    if (appId.startsWith("KG-")) {
      setResult("found");
    } else {
      setResult("notFound");
      toast.error(t("notFound"));
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">{t("title")}</h1>
        <p className="mt-2 text-neutral-300 text-sm">{t("subtitle")}</p>
      </div>

      <div className="mx-auto max-w-xl px-4 py-12">
        <form
          onSubmit={handleSearch}
          className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="appId">{t("applicationId")}</Label>
              <Input
                id="appId"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="KG-2026-XXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="statusEmail">{t("email")}</Label>
              <Input
                id="statusEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={result === "loading"}
            >
              {result === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {common("loading")}
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  {t("check")}
                </>
              )}
            </Button>
          </div>
        </form>

        {result === "notFound" && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            <p className="text-sm text-red-700">{t("notFound")}</p>
          </div>
        )}

        {result === "found" && (
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-lg font-semibold text-neutral-900">
              {t("title")}
            </h2>
            <div className="space-y-0">
              {DEMO_STATUSES.map((status, i) => {
                const isLast = i === DEMO_STATUSES.length - 1;
                return (
                  <div key={status.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <status.icon className="h-5 w-5 text-green-600" />
                      </div>
                      {!isLast && (
                        <div className="w-0.5 flex-1 bg-green-200 my-1" />
                      )}
                    </div>
                    <div className={cn("pb-6", isLast && "pb-0")}>
                      <p className="font-medium text-neutral-900">
                        {t(`timeline.${status.step}`)}
                      </p>
                      <p className="text-sm text-neutral-500">{status.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
