"use client";

import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowRight, Users } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gov-900 via-gov-800 to-gov-900">
      {/* Decorative tunduk pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 50%, rgba(228, 0, 43, 0.2) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Mountain silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-32 pt-16 sm:pb-40 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="accent"
            className="mb-6 gap-1.5 bg-accent-500/20 text-accent-300 border border-accent-500/30"
          >
            <Shield className="h-3 w-3" />
            {t("badge")}
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-neutral-300 sm:text-xl">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/apply">
                {t("cta")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outlineGov"
              size="xl"
              className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto"
            >
              <Link href="/eligibility">{t("ctaSecondary")}</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-neutral-400">
            <Users className="h-4 w-4" />
            {t("trusted")}
          </div>
        </div>
      </div>
    </section>
  );
}
