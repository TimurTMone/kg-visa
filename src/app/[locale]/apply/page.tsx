"use client";

import { useTranslations } from "next-intl";
import { WizardProvider, useWizard } from "@/components/apply/wizard-provider";
import { WizardShell } from "@/components/apply/wizard-shell";
import { StepPersonal } from "@/components/apply/step-personal";
import { StepPassport } from "@/components/apply/step-passport";
import { StepTravel } from "@/components/apply/step-travel";
import { StepDocuments } from "@/components/apply/step-documents";
import { StepReview } from "@/components/apply/step-review";
import { StepPayment } from "@/components/apply/step-payment";

function WizardContent() {
  const { state } = useWizard();

  return (
    <WizardShell>
      {state.currentStep === 1 && <StepPersonal />}
      {state.currentStep === 2 && <StepPassport />}
      {state.currentStep === 3 && <StepTravel />}
      {state.currentStep === 4 && <StepDocuments />}
      {state.currentStep === 5 && <StepReview />}
      {state.currentStep === 6 && <StepPayment />}
    </WizardShell>
  );
}

export default function ApplyPage() {
  const t = useTranslations("apply");

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">{t("title")}</h1>
        <p className="mt-2 text-neutral-300 text-sm">{t("subtitle")}</p>
      </div>
      <WizardProvider>
        <WizardContent />
      </WizardProvider>
    </div>
  );
}
