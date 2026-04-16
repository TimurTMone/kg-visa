"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">{nav("contact")}</h1>
        <p className="mt-2 text-neutral-300 text-sm">
          Get in touch with us
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">
            Ministry of Foreign Affairs of the Kyrgyz Republic
          </h2>

          <div className="space-y-5">
            <div className="flex items-start gap-4 rounded-lg bg-neutral-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gov-100">
                <MapPin className="h-5 w-5 text-gov-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 text-sm">
                  Address
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                  {t("address")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg bg-neutral-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gov-100">
                <Phone className="h-5 w-5 text-gov-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 text-sm">
                  Phone
                </h3>
                <p className="mt-1 text-sm text-neutral-600">{t("phone")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg bg-neutral-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gov-100">
                <Mail className="h-5 w-5 text-gov-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 text-sm">
                  Email
                </h3>
                <p className="mt-1 text-sm text-neutral-600">{t("email")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg bg-neutral-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gov-100">
                <Clock className="h-5 w-5 text-gov-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 text-sm">
                  Working Hours
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                  {t("workingHours")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
