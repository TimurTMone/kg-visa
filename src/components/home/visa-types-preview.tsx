"use client";

import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Briefcase,
  Users,
  Plane,
  ArrowRight,
  Clock,
  DollarSign,
} from "lucide-react";

export function VisaTypesPreview() {
  const t = useTranslations("visaTypes");

  const types = [
    {
      key: "tourist" as const,
      icon: Camera,
      popular: true,
    },
    {
      key: "tourist90" as const,
      icon: Plane,
      popular: false,
    },
    {
      key: "business" as const,
      icon: Briefcase,
      popular: false,
    },
    {
      key: "group" as const,
      icon: Users,
      popular: false,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900">{t("title")}</h2>
        <p className="mt-3 text-neutral-500">{t("subtitle")}</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {types.map(({ key, icon: Icon, popular }) => (
          <div
            key={key}
            className="relative rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            {popular && (
              <Badge className="absolute -top-2.5 left-4 bg-accent-500 text-white">
                Popular
              </Badge>
            )}

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gov-50">
              <Icon className="h-6 w-6 text-gov-500" />
            </div>

            <h3 className="text-lg font-semibold text-neutral-900">
              {t(`${key}.name`)}
            </h3>

            <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
              {t(`${key}.description`)}
            </p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Clock className="h-4 w-4 text-neutral-400" />
                {t(`${key}.duration`)}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                <DollarSign className="h-4 w-4 text-accent-500" />
                {t(`${key}.fee`)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="outlineGov">
          <Link href="/visa-types">
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
