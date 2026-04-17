"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/shared/animate-on-scroll";

export function FaqPreview() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t("q1.question"), a: t("q1.answer") },
    { q: t("q2.question"), a: t("q2.answer") },
    { q: t("q3.question"), a: t("q3.answer") },
    { q: t("q4.question"), a: t("q4.answer") },
    { q: t("q5.question"), a: t("q5.answer") },
  ];

  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <AnimateOnScroll variant="fadeUp" className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900">{t("title")}</h2>
        <p className="mt-3 text-neutral-500">{t("subtitle")}</p>
      </AnimateOnScroll>

      <StaggerContainer className="mt-12 space-y-3" staggerDelay={0.08}>
        {faqs.map((faq, i) => (
          <StaggerItem key={i}>
            <div
              className={cn(
                "rounded-xl border bg-white transition-all duration-200",
                openIndex === i
                  ? "border-gov-200 shadow-md"
                  : "border-neutral-200 hover:shadow-sm hover:border-neutral-300"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="pr-4 font-medium text-neutral-900">
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200",
                    openIndex === i && "rotate-180 text-gov-500"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200",
                  openIndex === i
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-4 text-sm leading-relaxed text-neutral-500">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimateOnScroll variant="fadeUp" delay={0.3} className="mt-10 text-center">
        <Button asChild variant="outlineGov">
          <Link href="/faq">
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </AnimateOnScroll>
    </section>
  );
}
