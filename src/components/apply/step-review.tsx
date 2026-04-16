"use client";

import { useTranslations } from "next-intl";
import { useWizard, type WizardStep } from "./wizard-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Pencil } from "lucide-react";
import { ALL_COUNTRIES, VISA_TYPES } from "@/lib/constants";

function Section({
  title,
  step,
  children,
}: {
  title: string;
  step: WizardStep;
  children: React.ReactNode;
}) {
  const t = useTranslations("apply.review");
  const { goToStep } = useWizard();

  return (
    <div className="rounded-lg border border-neutral-200 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900">{title}</h3>
        <button
          type="button"
          onClick={() => goToStep(step)}
          className="flex items-center gap-1 text-xs font-medium text-gov-500 hover:text-gov-600"
        >
          <Pencil className="h-3 w-3" />
          {t("edit")}
        </button>
      </div>
      <div className="grid gap-2 text-sm">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium text-neutral-900">{value || "—"}</span>
    </div>
  );
}

export function StepReview() {
  const t = useTranslations("apply");
  const { state, nextStep, prevStep } = useWizard();

  const countryName = (code: string | undefined) =>
    ALL_COUNTRIES.find((c) => c.code === code)?.name ?? code ?? "—";

  const visaType = VISA_TYPES.find((v) => v.id === state.travel.visaType);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">
          {t("review.title")}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          {t("review.subtitle")}
        </p>
      </div>

      <div className="space-y-4">
        <Section title={t("steps.personal")} step={1}>
          <Field label={t("personal.firstName")} value={state.personal.firstName} />
          <Field label={t("personal.lastName")} value={state.personal.lastName} />
          <Field label={t("personal.dateOfBirth")} value={state.personal.dateOfBirth} />
          <Field label={t("personal.gender")} value={state.personal.gender} />
          <Field
            label={t("personal.nationality")}
            value={countryName(state.personal.nationality)}
          />
          <Field label={t("personal.email")} value={state.personal.email} />
          <Field label={t("personal.phone")} value={state.personal.phone} />
        </Section>

        <Section title={t("steps.passport")} step={2}>
          <Field label={t("passport.number")} value={state.passport.number} />
          <Field label={t("passport.issueDate")} value={state.passport.issueDate} />
          <Field label={t("passport.expiryDate")} value={state.passport.expiryDate} />
          <Field
            label={t("passport.issuingCountry")}
            value={countryName(state.passport.issuingCountry)}
          />
        </Section>

        <Section title={t("steps.travel")} step={3}>
          <Field label={t("travel.entryDate")} value={state.travel.entryDate} />
          <Field label={t("travel.exitDate")} value={state.travel.exitDate} />
          <Field label={t("travel.purpose")} value={state.travel.purpose} />
          <Field label={t("travel.accommodation")} value={state.travel.accommodation} />
        </Section>

        <Section title={t("steps.documents")} step={4}>
          <Field
            label={t("documents.photo")}
            value={state.documents.photo?.name ?? "Not uploaded"}
          />
          <Field
            label={t("documents.passportScan")}
            value={state.documents.passportScan?.name ?? "Not uploaded"}
          />
          <Field
            label={t("documents.invitation")}
            value={state.documents.invitation?.name ?? "N/A"}
          />
        </Section>
      </div>

      {/* Fee summary */}
      <div className="rounded-lg bg-neutral-50 p-5">
        <div className="flex items-center justify-between">
          <span className="font-medium text-neutral-700">{t("payment.total")}</span>
          <span className="text-2xl font-bold text-neutral-900">
            ${visaType?.fee ?? 50}
          </span>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" size="lg" onClick={prevStep}>
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Button>
        <Button type="button" size="lg" onClick={nextStep}>
          {t("review.confirm")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
