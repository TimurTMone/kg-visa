"use client";

import { useTranslations } from "next-intl";
import { useWizard, type WizardStep } from "./wizard-provider";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const STEP_KEYS = [
  "personal",
  "passport",
  "travel",
  "documents",
  "review",
  "payment",
] as const;

export function WizardShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("apply.steps");
  const common = useTranslations("common");
  const { state } = useWizard();
  const progress = ((state.currentStep - 1) / 5) * 100;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      {/* Mobile progress */}
      <div className="mb-6 sm:hidden">
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span>{common("stepOf", { current: String(state.currentStep), total: "6" })}</span>
          <span className="font-medium text-neutral-900">
            {t(STEP_KEYS[state.currentStep - 1])}
          </span>
        </div>
        <Progress value={progress} className="mt-2" />
      </div>

      {/* Desktop stepper */}
      <nav className="mb-10 hidden sm:block" aria-label="Progress">
        <ol className="flex items-center justify-between">
          {STEP_KEYS.map((key, i) => {
            const stepNum = (i + 1) as WizardStep;
            const isActive = state.currentStep === stepNum;
            const isCompleted = state.currentStep > stepNum;

            return (
              <li key={key} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all",
                      isCompleted &&
                        "bg-primary-500 text-white",
                      isActive &&
                        "bg-gov-500 text-white ring-4 ring-gov-100",
                      !isActive &&
                        !isCompleted &&
                        "bg-neutral-200 text-neutral-500"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      stepNum
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isActive ? "text-gov-600" : "text-neutral-400"
                    )}
                  >
                    {t(key)}
                  </span>
                </div>
                {i < STEP_KEYS.length - 1 && (
                  <div
                    className={cn(
                      "mx-2 h-0.5 flex-1",
                      isCompleted ? "bg-primary-500" : "bg-neutral-200"
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Step content */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        {children}
      </div>
    </div>
  );
}
