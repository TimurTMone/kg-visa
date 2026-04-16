"use client";

import { useTranslations } from "next-intl";
import { Shield, Globe, Clock, Users } from "lucide-react";

export default function AboutPage() {
  const nav = useTranslations("nav");

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">{nav("about")}</h1>
        <p className="mt-2 text-neutral-300 text-sm">
          About the e-Visa portal
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            Electronic Visa Portal of the Kyrgyz Republic
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-6">
            The e-Visa portal is the official electronic visa application
            system of the Kyrgyz Republic, operated by the Ministry of
            Foreign Affairs. The portal enables foreign nationals to apply
            for electronic visas to enter the Kyrgyz Republic without
            visiting an embassy or consulate.
          </p>
          <p className="text-neutral-600 leading-relaxed mb-8">
            An electronic visa provides the same right to enter Kyrgyzstan
            as an ordinary sticker-visa. You only need an internet
            connection, a credit or debit card for payment, and scanned
            copies of your documents.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: Shield,
                title: "Secure & Official",
                desc: "Government-operated portal with encrypted data transmission and secure payment processing.",
              },
              {
                icon: Globe,
                title: "Fully Online",
                desc: "Complete your entire application from anywhere in the world — no embassy visit required.",
              },
              {
                icon: Clock,
                title: "Fast Processing",
                desc: "Applications are processed within 3 business days. Receive your e-Visa by email.",
              },
              {
                icon: Users,
                title: "100,000+ Travelers",
                desc: "Trusted by travelers from over 80 countries worldwide.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-lg bg-neutral-50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gov-100">
                  <item.icon className="h-5 w-5 text-gov-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
