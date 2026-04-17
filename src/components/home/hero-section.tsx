"use client";

import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowRight, Users } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gov-900 via-gov-800 to-gov-900">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute h-[500px] w-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)",
            top: "10%",
            left: "15%",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-[400px] w-[400px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(228, 0, 43, 0.3) 0%, transparent 70%)",
            top: "20%",
            right: "10%",
          }}
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Mountain silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-32 pt-16 sm:pb-40 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Badge
              variant="accent"
              className="mb-6 gap-1.5 bg-accent-500/20 text-accent-300 border border-accent-500/30"
            >
              <Shield className="h-3 w-3" />
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            className="mt-6 text-lg leading-relaxed text-neutral-300 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
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
          </motion.div>

          <motion.div
            className="mt-10 flex items-center justify-center gap-2 text-sm text-neutral-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease }}
          >
            <Users className="h-4 w-4" />
            {t("trusted")}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
