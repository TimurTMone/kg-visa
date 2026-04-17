"use client";

import { useTranslations } from "next-intl";
import { ClipboardList, Upload, CreditCard } from "lucide-react";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/shared/animate-on-scroll";

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      icon: ClipboardList,
      step: "01",
      title: t("step1.title"),
      description: t("step1.description"),
      color: "from-primary-500 to-primary-600",
    },
    {
      icon: Upload,
      step: "02",
      title: t("step2.title"),
      description: t("step2.description"),
      color: "from-gov-500 to-gov-600",
    },
    {
      icon: CreditCard,
      step: "03",
      title: t("step3.title"),
      description: t("step3.description"),
      color: "from-accent-500 to-accent-600",
    },
  ];

  return (
    <section className="bg-neutral-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <AnimateOnScroll variant="fadeUp" className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900">
            {t("title")}
          </h2>
          <p className="mt-3 text-neutral-500">{t("subtitle")}</p>
        </AnimateOnScroll>

        <StaggerContainer className="mt-14 grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
          {steps.map((step, i) => (
            <StaggerItem key={step.step}>
              <div className="relative text-center group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+40px)] right-[calc(-50%+40px)] top-10 hidden border-t-2 border-dashed border-neutral-300 md:block" />
                )}

                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg transition-transform duration-300 group-hover:scale-105`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-neutral-900 shadow-md ring-2 ring-neutral-100">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
