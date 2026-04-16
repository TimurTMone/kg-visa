"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw, AlertCircle, Info, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const continueSchema = z.object({
  refId: z
    .string()
    .min(1, "Reference number is required"),
  email: z.email("Please enter a valid email address"),
});

type ContinueFormData = z.infer<typeof continueSchema>;

export default function ContinuePage() {
  const t = useTranslations("continuePage");
  const [status, setStatus] = useState<"idle" | "searching" | "notFound" | "found">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContinueFormData>({
    resolver: zodResolver(continueSchema),
  });

  const onSubmit = async (data: ContinueFormData) => {
    setStatus("searching");

    try {
      const res = await fetch(
        `/api/apply/continue?id=${encodeURIComponent(data.refId)}&email=${encodeURIComponent(data.email)}`
      );

      if (!res.ok) {
        setStatus("notFound");
        toast.error(t("notFound"));
        return;
      }

      const appData = await res.json();

      // Save to sessionStorage so the wizard can pick it up
      const wizardState = {
        currentStep: 1,
        personal: appData.personal,
        passport: appData.passport,
        travel: appData.travel,
      };
      sessionStorage.setItem("kg-visa-wizard", JSON.stringify(wizardState));

      setStatus("found");
      toast.success(t("found"));

      // Redirect to the apply page
      setTimeout(() => {
        window.location.href = window.location.pathname.replace("/apply/continue", "/apply");
      }, 1000);
    } catch {
      setStatus("notFound");
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
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="refId">{t("refId")}</Label>
              <Input
                id="refId"
                placeholder={t("refIdPlaceholder")}
                {...register("refId")}
                aria-invalid={!!errors.refId}
              />
              {errors.refId && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.refId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contEmail">{t("email")}</Label>
              <Input
                id="contEmail"
                type="email"
                placeholder={t("emailPlaceholder")}
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={status === "searching" || status === "found"}
            >
              {status === "searching" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("searching")}
                </>
              ) : status === "found" ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  {t("found")}
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4" />
                  {t("resume")}
                </>
              )}
            </Button>
          </div>

          {status === "notFound" && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              <p className="text-sm text-red-700">{t("notFound")}</p>
            </div>
          )}
        </form>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gov-500" />
          <p className="text-sm text-neutral-500">{t("hint")}</p>
        </div>
      </div>
    </div>
  );
}
