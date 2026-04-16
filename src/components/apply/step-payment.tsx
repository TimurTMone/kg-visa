"use client";

import { useTranslations } from "next-intl";
import { useWizard } from "./wizard-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Lock, CheckCircle2, Loader2 } from "lucide-react";
import { VISA_TYPES } from "@/lib/constants";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "@i18n/navigation";

async function uploadFile(file: File, type: string): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) return null;
  const data = await res.json();
  return data.path;
}

export function StepPayment() {
  const t = useTranslations("apply.payment");
  const tApply = useTranslations("apply");
  const { state, prevStep } = useWizard();
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [refId, setRefId] = useState("");

  const visaType = VISA_TYPES.find((v) => v.id === state.travel.visaType);
  const fee = visaType?.fee ?? 50;

  const handleSubmit = async () => {
    setProcessing(true);

    try {
      // 1. Upload documents
      let photoUrl: string | null = null;
      let passportScanUrl: string | null = null;
      let invitationUrl: string | null = null;

      if (state.documents.photo) {
        photoUrl = await uploadFile(state.documents.photo, "photo");
      }
      if (state.documents.passportScan) {
        passportScanUrl = await uploadFile(state.documents.passportScan, "passport_scan");
      }
      if (state.documents.invitation) {
        invitationUrl = await uploadFile(state.documents.invitation, "invitation");
      }

      // 2. Submit application
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personal: state.personal,
          passport: state.passport,
          travel: state.travel,
          photoUrl,
          passportScanUrl,
          invitationUrl,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      const data = await res.json();
      setRefId(data.refId);
      setSubmitted(true);
      toast.success("Application submitted successfully!");
      sessionStorage.removeItem("kg-visa-wizard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">
          Application Submitted!
        </h2>
        <p className="mt-3 text-neutral-500 max-w-md mx-auto">
          Your e-Visa application has been submitted successfully. You will
          receive a confirmation email at{" "}
          <strong>{state.personal.email}</strong> with your application ID.
        </p>
        {refId && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
            <span className="text-xs font-medium text-neutral-500 uppercase">
              Reference:
            </span>
            <span className="font-mono text-lg font-bold text-neutral-900">
              {refId}
            </span>
          </div>
        )}
        <p className="mt-4 text-sm text-neutral-400">
          Processing typically takes 3 business days.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="secondary">
            <Link href="/status">Check Status</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">{t("title")}</h2>
      </div>

      <div className="rounded-lg border border-neutral-200 p-5">
        <h3 className="mb-4 font-semibold text-neutral-900">{t("summary")}</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-500">Visa Type</span>
            <span className="font-medium capitalize">{state.travel.visaType?.replace("90", " (90 days)")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Duration</span>
            <span className="font-medium">{visaType?.maxDays} days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Processing</span>
            <span className="font-medium">3 business days</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-base">
            <span className="font-semibold text-neutral-900">{t("total")}</span>
            <span className="text-xl font-bold text-neutral-900">${fee}</span>
          </div>
        </div>
      </div>

      {/* Payment method selection (placeholder until Stripe) */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg border-2 border-gov-500 bg-gov-50 p-4 cursor-pointer">
          <CreditCard className="h-5 w-5 text-gov-500" />
          <div>
            <p className="text-sm font-medium text-neutral-900">
              Credit / Debit Card
            </p>
            <p className="text-xs text-neutral-500">
              Visa, Mastercard, UnionPay
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-neutral-400">
        <Lock className="h-3.5 w-3.5" />
        {t("secure")}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" size="lg" onClick={prevStep}>
          <ArrowLeft className="h-4 w-4" />
          {tApply("back")}
        </Button>
        <Button
          size="lg"
          disabled={processing}
          onClick={handleSubmit}
        >
          {processing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              {t("payNow")} — ${fee}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
