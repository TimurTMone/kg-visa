"use client";

import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, RotateCcw, Search, Repeat } from "lucide-react";
import { ArrowRight } from "lucide-react";

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
      border: "hover:border-primary-300",
    },
    {
      icon: RotateCcw,
      title: t("continue.title"),
      description: t("continue.description"),
      href: "/apply/continue",
      color: "text-gov-500",
      bg: "bg-gov-50",
      border: "hover:border-gov-300",
    },
    {
      icon: Search,
      title: t("status.title"),
      description: t("status.description"),
      href: "/status",
      color: "text-accent-600",
      bg: "bg-accent-50",
      border: "hover:border-accent-300",
    },
    {
      icon: Repeat,
      title: t("transfer.title"),
      description: t("transfer.description"),
      href: "/transfer",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "hover:border-green-300",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900">{t("title")}</h2>
        <p className="mt-3 text-neutral-500">{t("subtitle")}</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Link key={service.href} href={service.href} className="group">
            <Card
              className={`h-full transition-all duration-300 ${service.border} group-hover:shadow-lg group-hover:-translate-y-1`}
            >
              <CardHeader className="space-y-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.bg}`}
                >
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <CardTitle className="flex items-center gap-2">
                  {service.title}
                  <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
