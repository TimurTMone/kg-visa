"use client";

import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, RotateCcw, Search, Repeat, ArrowRight } from "lucide-react";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/shared/animate-on-scroll";

export function ServiceCards() {
  const t = useTranslations("services");

  const services = [
    {
      icon: FileText,
      title: t("apply.title"),
      description: t("apply.description"),
      href: "/apply",
      color: "text-primary-500",
      bg: "bg-primary-50",
      hoverBorder: "group-hover:border-primary-300",
      hoverIconBg: "group-hover:bg-primary-100",
    },
    {
      icon: RotateCcw,
      title: t("continue.title"),
      description: t("continue.description"),
      href: "/apply/continue",
      color: "text-gov-500",
      bg: "bg-gov-50",
      hoverBorder: "group-hover:border-gov-300",
      hoverIconBg: "group-hover:bg-gov-100",
    },
    {
      icon: Search,
      title: t("status.title"),
      description: t("status.description"),
      href: "/status",
      color: "text-accent-600",
      bg: "bg-accent-50",
      hoverBorder: "group-hover:border-accent-300",
      hoverIconBg: "group-hover:bg-accent-100",
    },
    {
      icon: Repeat,
      title: t("transfer.title"),
      description: t("transfer.description"),
      href: "/transfer",
      color: "text-green-600",
      bg: "bg-green-50",
      hoverBorder: "group-hover:border-green-300",
      hoverIconBg: "group-hover:bg-green-100",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <AnimateOnScroll variant="fadeUp" className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900">{t("title")}</h2>
        <p className="mt-3 text-neutral-500">{t("subtitle")}</p>
      </AnimateOnScroll>

      <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
        {services.map((service) => (
          <StaggerItem key={service.href}>
            <Link href={service.href} className="group block h-full">
              <Card
                className={`h-full transition-all duration-300 ${service.hoverBorder} group-hover:shadow-lg group-hover:-translate-y-1`}
              >
                <CardHeader className="space-y-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.bg} ${service.hoverIconBg} transition-all duration-300`}
                  >
                    <service.icon
                      className={`h-6 w-6 ${service.color} transition-transform duration-300 group-hover:rotate-6`}
                    />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    {service.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1.5" />
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
