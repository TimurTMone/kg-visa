"use client";

import { useTranslations } from "next-intl";
import { Clock, DollarSign, Calendar } from "lucide-react";

export function StatsBar() {
  const t = useTranslations("stats");

  const stats = [
    {
      icon: Clock,
      label: t("processing"),
      value: t("processingValue"),
      color: "text-gov-500",
      bg: "bg-gov-50",
    },
    {
      icon: DollarSign,
      label: t("fee"),
      value: t("feeValue"),
      color: "text-accent-600",
      bg: "bg-accent-50",
    },
    {
      icon: Calendar,
      label: t("validity"),
      value: t("validityValue"),
      color: "text-primary-500",
      bg: "bg-primary-50",
    },
  ];

  return (
    <section className="-mt-16 relative z-10 mx-auto max-w-5xl px-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-lg"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {stat.label}
              </div>
              <div className="text-lg font-bold text-neutral-900">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
