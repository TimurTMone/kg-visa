"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Link } from "@i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Repeat,
  AlertCircle,
  Info,
  CheckCircle2,
  Loader2,
  Home,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

const transferSchema = z.object({
  visaNumber: z.string().min(1, "Visa number is required"),
  oldPassport: z
    .string()
    .min(1, "Current passport number is required")
    .regex(/^[A-Z0-9]{6,12}$/i, "Enter a valid passport number"),
  newPassport: z
    .string()
    .min(1, "New passport number is required")
    .regex(/^[A-Z0-9]{6,12}$/i, "Enter a valid passport number"),
  newPassportExpiry: z.string().min(1, "Expiry date is required"),
  email: z.email("Please enter a valid email address"),
  reason: z.enum(["newPassport", "nameChange", "damaged", "other"]),
});

type TransferFormData = z.infer<typeof transferSchema>;

function generateTrackingId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "TR-";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export default function TransferPage() {
  const t = useTranslations("transferPage");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [trackingId, setTrackingId] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: { reason: "newPassport" },
  });

  const onSubmit = async (data: TransferFormData) => {
    // Validate new passport expiry is at least 6 months away
    const expiry = new Date(data.newPassportExpiry);
    const sixMonths = new Date();
    sixMonths.setMonth(sixMonths.getMonth() + 6);
    if (expiry < sixMonths) {
      toast.error(t("note"));
      return;
    }

    // Validate old !== new passport
    if (data.oldPassport.toUpperCase() === data.newPassport.toUpperCase()) {
      toast.error("New passport number must differ from the current one.");
      return;
    }

    setStatus("submitting");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 2000));

    const id = generateTrackingId();
    setTrackingId(id);
    setSubmittedEmail(data.email);
    setStatus("success");
    toast.success(t("successTitle"));
  };

  const handleNewRequest = () => {
    setStatus("idle");
    setTrackingId("");
    setSubmittedEmail("");
    reset();
  };

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    toast.success("Copied!");
  };

  if (status === "success") {
    return (
      <div className="bg-neutral-50 min-h-screen">
        <div className="bg-gov-900 py-8 text-center text-white">
          <h1 className="text-2xl font-bold sm:text-3xl">{t("title")}</h1>
          <p className="mt-2 text-neutral-300 text-sm">{t("subtitle")}</p>
        </div>

        <div className="mx-auto max-w-xl px-4 py-12">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">
              {t("successTitle")}
            </h2>
            <p className="mt-3 text-neutral-500 text-sm">
              {t("successMessage", { email: submittedEmail })}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
              <span className="text-xs font-medium text-neutral-500 uppercase">
                {t("trackingId")}:
              </span>
              <span className="font-mono text-lg font-bold text-neutral-900">
                {trackingId}
              </span>
              <button
                type="button"
                onClick={copyTrackingId}
                className="ml-1 rounded p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild variant="outline">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  {t("backHome")}
                </Link>
              </Button>
              <Button variant="secondary" onClick={handleNewRequest}>
                <Repeat className="h-4 w-4" />
                {t("newRequest")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <Label htmlFor="visaNumber">{t("visaNumber")}</Label>
              <Input
                id="visaNumber"
                placeholder={t("visaNumberPlaceholder")}
                {...register("visaNumber")}
                aria-invalid={!!errors.visaNumber}
              />
              {errors.visaNumber && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.visaNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="oldPassport">{t("oldPassport")}</Label>
              <Input
                id="oldPassport"
                placeholder={t("oldPassportPlaceholder")}
                {...register("oldPassport")}
                aria-invalid={!!errors.oldPassport}
              />
              {errors.oldPassport && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.oldPassport.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassport">{t("newPassport")}</Label>
              <Input
                id="newPassport"
                placeholder={t("newPassportPlaceholder")}
                {...register("newPassport")}
                aria-invalid={!!errors.newPassport}
              />
              {errors.newPassport && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.newPassport.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassportExpiry">{t("newPassportExpiry")}</Label>
              <Input
                id="newPassportExpiry"
                type="date"
                {...register("newPassportExpiry")}
                aria-invalid={!!errors.newPassportExpiry}
              />
              {errors.newPassportExpiry && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.newPassportExpiry.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="transferEmail">{t("email")}</Label>
              <Input
                id="transferEmail"
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

            <div className="space-y-2">
              <Label htmlFor="reason">{t("reason")}</Label>
              <select
                id="reason"
                {...register("reason")}
                className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gov-500 focus-visible:ring-offset-2"
              >
                <option value="newPassport">{t("reasons.newPassport")}</option>
                <option value="nameChange">{t("reasons.nameChange")}</option>
                <option value="damaged">{t("reasons.damaged")}</option>
                <option value="other">{t("reasons.other")}</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                <>
                  <Repeat className="h-4 w-4" />
                  {t("submit")}
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gov-500" />
          <p className="text-sm text-neutral-500">{t("note")}</p>
        </div>
      </div>
    </div>
  );
}
