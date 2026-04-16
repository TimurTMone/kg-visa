"use client";

import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ChevronDown,
  Shield,
} from "lucide-react";
import { useState } from "react";

export function Header() {
  const t = useTranslations("nav");
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      {/* Top bar - government trust indicator */}
      <div className="bg-gov-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3" />
            <span className="hidden sm:inline">
              Official Portal — Ministry of Foreign Affairs of the Kyrgyz Republic
            </span>
            <span className="sm:hidden">Official Government Portal</span>
          </div>
          <span className="text-neutral-300">evisa.e-gov.kg</span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm">
            KR
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-neutral-900 leading-tight">
              e-Visa
            </div>
            <div className="text-xs text-neutral-500 leading-tight">
              Kyrgyz Republic
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" role="navigation">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900">
              {t("services")}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg">
                <Link
                  href="/apply"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  <FileText className="h-4 w-4 text-primary-500" />
                  {t("apply")}
                </Link>
                <Link
                  href="/apply/continue"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  {t("continue")}
                </Link>
                <Link
                  href="/status"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  {t("status")}
                </Link>
                <Link
                  href="/transfer"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  {t("transfer")}
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/visa-types"
            className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            {t("visaTypes")}
          </Link>
          <Link
            href="/eligibility"
            className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            {t("eligibility")}
          </Link>
          <Link
            href="/faq"
            className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            {t("faq")}
          </Link>
          <Link
            href="/contact"
            className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            {t("contact")}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/apply">{t("apply")}</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
