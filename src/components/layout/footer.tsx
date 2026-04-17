"use client";

import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm">
                KR
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">
                  e-Visa Portal
                </div>
                <div className="text-xs text-neutral-400 leading-tight">
                  {t("republic")}
                </div>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {t("official")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/apply"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {nav("apply")}
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {nav("status")}
                </Link>
              </li>
              <li>
                <Link
                  href="/visa-types"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {nav("visaTypes")}
                </Link>
              </li>
              <li>
                <Link
                  href="/eligibility"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {nav("eligibility")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {nav("faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              {nav("contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-neutral-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {t("address")}
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <Phone className="h-4 w-4 shrink-0" />
                {t("phone")}
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <Mail className="h-4 w-4 shrink-0" />
                {t("email")}
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <Clock className="h-4 w-4 shrink-0" />
                {t("workingHours")}
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              {t("legal")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-neutral-400 transition-colors hover:text-white">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-neutral-400 transition-colors hover:text-white">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-sm text-neutral-400 transition-colors hover:text-white">
                  {t("accessibility")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
          {t("copyright", { year: String(year) })}
        </div>
      </div>
    </footer>
  );
}
