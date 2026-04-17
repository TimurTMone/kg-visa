"use client";

import { useTranslations } from "next-intl";
import { Clock, DollarSign, Calendar } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/shared/animate-on-scroll";

export function StatsBar() {
  const t = useTranslations("stats");

  const stats = [
    {
      icon: Clock,
      label: t("processing"),
      value: t("processingValue"),
      color: "text-gov-500",
      bg: "bg-gov-50",
      accent: "border-l-gov-500",
    },
    {
      icon: DollarSign,
      label: t("fee"),
      value: t("feeValue"),
      color: "text-accent-600",
      bg: "bg-accent-50",
      accent: "border-l-accent-500",
    },
    {
      icon: Calendar,
      label: t("validity"),
      value: t("validityValue"),
      color: "text-primary-500",
      bg: "bg-primary-50",
      accent: "border-l-primary-500",
    },
  ];

  return (
    <section className="-mt-16 relative z-10 mx-auto max-w-5xl px-4">
      <StaggerContainer className="grid gap-4 sm:grid-cols-3" staggerDelay={0.12}>
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <div
              className={`flex items-center gap-4 rounded-xl border border-neutral-200 ${stat.accent} border-l-4 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}
              >
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  {stat.label}
                </div>
                <div className="text-xl font-bold text-neutral-900">
                  {stat.value}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
