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
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/shared/animate-on-scroll";

export function VisaTypesPreview() {
  const t = useTranslations("visaTypes");

  const types = [
    {
      key: "tourist" as const,
      icon: Camera,
      popular: true,
      iconColor: "text-primary-500",
      iconBg: "bg-primary-50",
      hoverBorder: "hover:border-primary-300",
    },
    {
      key: "tourist90" as const,
      icon: Plane,
      popular: false,
      iconColor: "text-accent-600",
      iconBg: "bg-accent-50",
      hoverBorder: "hover:border-accent-300",
    },
    {
      key: "business" as const,
      icon: Briefcase,
      popular: false,
      iconColor: "text-gov-500",
      iconBg: "bg-gov-50",
      hoverBorder: "hover:border-gov-300",
    },
    {
      key: "group" as const,
      icon: Users,
      popular: false,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      hoverBorder: "hover:border-green-300",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <AnimateOnScroll variant="fadeUp" className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900">{t("title")}</h2>
        <p className="mt-3 text-neutral-500">{t("subtitle")}</p>
      </AnimateOnScroll>

      <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
        {types.map(({ key, icon: Icon, popular, iconColor, iconBg, hoverBorder }) => (
          <StaggerItem key={key}>
            <div
              className={`relative rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${hoverBorder} ${
                popular ? "ring-2 ring-accent-200 bg-accent-50/30" : ""
              }`}
            >
              {popular && (
                <Badge className="absolute -top-2.5 left-4 bg-accent-500 text-white animate-pulse-subtle">
                  Popular
                </Badge>
              )}

              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
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
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimateOnScroll variant="fadeUp" delay={0.4} className="mt-10 text-center">
        <Button asChild variant="outlineGov">
          <Link href="/visa-types">
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </AnimateOnScroll>
    </section>
  );
}
