"use client";

import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Plane,
  Briefcase,
  Users,
  ArrowRight,
  Clock,
  DollarSign,
  CheckCircle2,
  Globe,
} from "lucide-react";

export default function VisaTypesPage() {
  const t = useTranslations("visaTypes");

  const types = [
    {
      key: "tourist" as const,
      icon: Camera,
      features: ["Single entry", "30 days maximum stay", "Tourism purposes only", "No extension available"],
    },
    {
      key: "tourist90" as const,
      icon: Plane,
      features: ["Single entry", "90 days maximum stay", "Extended tourism", "Trekking & cultural exploration"],
    },
    {
      key: "business" as const,
      icon: Briefcase,
      features: ["Single entry", "90 days maximum stay", "Invitation letter required", "Business meetings & conferences"],
    },
    {
      key: "group" as const,
      icon: Users,
      features: ["Group of 5+ travelers", "30 days maximum stay", "Discounted group rate", "Tour operator must apply"],
    },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">{t("title")}</h1>
        <p className="mt-2 text-neutral-300 text-sm">{t("subtitle")}</p>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {types.map(({ key, icon: Icon, features }) => (
            <div
              key={key}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gov-50">
                  <Icon className="h-6 w-6 text-gov-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    {t(`${key}.name`)}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {t(`${key}.duration`)}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-accent-600">
                      <DollarSign className="h-3.5 w-3.5" />
                      {t(`${key}.fee`)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-sm text-neutral-600 leading-relaxed">
                {t(`${key}.description`)}
              </p>

              <ul className="mb-6 space-y-2">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-neutral-600"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full">
                <Link href="/apply">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
