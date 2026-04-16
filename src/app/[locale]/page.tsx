import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/hero-section";
import { StatsBar } from "@/components/home/stats-bar";
import { ServiceCards } from "@/components/home/service-cards";
import { HowItWorks } from "@/components/home/how-it-works";
import { VisaTypesPreview } from "@/components/home/visa-types-preview";
import { EligibilityTeaser } from "@/components/home/eligibility-teaser";
import { FaqPreview } from "@/components/home/faq-preview";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServiceCards />
      <HowItWorks />
      <VisaTypesPreview />
      <EligibilityTeaser />
      <FaqPreview />
    </>
  );
}
