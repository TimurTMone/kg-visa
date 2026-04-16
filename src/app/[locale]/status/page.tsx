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
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { ApplicationStatus } from "@/types/visa";

const STATUS_ICONS: Record<ApplicationStatus, typeof Send> = {
  submitted: Send,
  review: Clock,
  approved: CheckCircle2,
  issued: FileCheck,
  rejected: XCircle,
};

const STATUS_ORDER: ApplicationStatus[] = ["submitted", "review", "approved", "issued"];

interface AppResult {
  id: string;
  refId: string;
  status: ApplicationStatus;
  applicant: string;
  visaType: string;
  createdAt: string;
  updatedAt: string;
}

export default function StatusPage() {
  const t = useTranslations("status");
  const common = useTranslations("common");
  const [result, setResult] = useState<"idle" | "loading" | "found" | "notFound">("idle");
  const [appId, setAppId] = useState("");
  const [email, setEmail] = useState("");
  const [appData, setAppData] = useState<AppResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId || !email) return;

    setResult("loading");

    try {
      const data = await api.applications.status(appId, email) as unknown as AppResult;
      setAppData(data);
      setResult("found");
    } catch {
      setResult("notFound");
      toast.error(t("notFound"));
    }
  };

  // Determine which steps are "done" based on current status
  const currentStatusIndex = appData
    ? STATUS_ORDER.indexOf(appData.status)
    : -1;

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

        {result === "found" && appData && (
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            {/* Application info */}
            <div className="mb-6 rounded-lg bg-neutral-50 p-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-neutral-500">Ref:</span>{" "}
                  <span className="font-mono font-medium">{appData.refId}</span>
                </div>
                <div>
                  <span className="text-neutral-500">Type:</span>{" "}
                  <span className="font-medium capitalize">{appData.visaType}</span>
                </div>
                <div>
                  <span className="text-neutral-500">Applicant:</span>{" "}
                  <span className="font-medium">{appData.applicant}</span>
                </div>
                <div>
                  <span className="text-neutral-500">Submitted:</span>{" "}
                  <span className="font-medium">
                    {new Date(appData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            {appData.status === "rejected" ? (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <p className="font-medium text-red-700">
                    {t("timeline.rejected")}
                  </p>
                  <p className="text-sm text-red-600">
                    {new Date(appData.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {STATUS_ORDER.map((step, i) => {
                  const isLast = i === STATUS_ORDER.length - 1;
                  const isDone = i <= currentStatusIndex;
                  const Icon = STATUS_ICONS[step];
                  return (
                    <div key={step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full",
                            isDone
                              ? "bg-green-100"
                              : "bg-neutral-100"
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-5 w-5",
                              isDone ? "text-green-600" : "text-neutral-400"
                            )}
                          />
                        </div>
                        {!isLast && (
                          <div
                            className={cn(
                              "w-0.5 flex-1 my-1",
                              isDone ? "bg-green-200" : "bg-neutral-200"
                            )}
                          />
                        )}
                      </div>
                      <div className={cn("pb-6", isLast && "pb-0")}>
                        <p
                          className={cn(
                            "font-medium",
                            isDone ? "text-neutral-900" : "text-neutral-400"
                          )}
                        >
                          {t(`timeline.${step}`)}
                        </p>
                        {isDone && (
                          <p className="text-sm text-neutral-500">
                            {i === currentStatusIndex
                              ? new Date(appData.updatedAt).toLocaleDateString()
                              : new Date(appData.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
