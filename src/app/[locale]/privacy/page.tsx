"use client";

import { Lock, ShieldCheck, Database, Cookie, Users, Clock, UserCheck, Mail } from "lucide-react";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

const sections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    content: `When you use the e-Visa portal, we collect the following categories of personal data:

\u2022 Full legal name, date of birth, nationality, and gender
\u2022 Passport number, issue and expiry dates, and country of issue
\u2022 Digital passport photograph and scanned passport bio-data page
\u2022 Contact information including email address and phone number
\u2022 Travel itinerary details: intended dates of entry and departure, accommodation address
\u2022 Employment and education information as required for visa assessment
\u2022 Payment information (processed securely by our PCI-DSS compliant payment provider)

We do not collect data beyond what is strictly necessary for processing your visa application.`,
  },
  {
    icon: ShieldCheck,
    title: "2. Passport Data Handling",
    content: `Your passport data is treated with the highest level of security:

\u2022 Uploaded passport scans are encrypted at rest using AES-256 encryption
\u2022 Passport data is transmitted exclusively over TLS 1.3 encrypted connections
\u2022 Access to passport information is restricted to authorized visa processing officers
\u2022 Biometric data extracted from passport photos is used solely for identity verification
\u2022 Passport numbers are partially masked in all internal logs and audit trails
\u2022 Physical and digital access controls comply with ISO 27001 standards`,
  },
  {
    icon: Cookie,
    title: "3. Cookies & Tracking",
    content: `The portal uses the following cookies:

\u2022 Essential cookies: Session management and security tokens (strictly necessary, no consent required)
\u2022 Functional cookies: Language preference and form auto-save (expire after 30 days)
\u2022 Analytics cookies: Anonymized usage statistics to improve portal performance (optional, consent required)

We do not use advertising or marketing cookies. No personal data is shared with advertising networks. You may manage your cookie preferences at any time through the cookie settings panel in the footer.`,
  },
  {
    icon: Users,
    title: "4. Third-Party Data Sharing",
    content: `Your personal data may be shared with the following parties solely for visa processing purposes:

\u2022 Ministry of Foreign Affairs of the Kyrgyz Republic \u2014 primary visa adjudication authority
\u2022 State Committee for National Security \u2014 security screening as required by law
\u2022 Border Service of the Kyrgyz Republic \u2014 entry verification at ports of entry
\u2022 Authorized payment processors \u2014 for secure transaction processing only
\u2022 Cloud infrastructure providers \u2014 data hosting within government-approved facilities

We do not sell, trade, or otherwise transfer your personal data to commercial third parties. Data sharing with foreign governments occurs only pursuant to bilateral agreements and applicable law.`,
  },
  {
    icon: Clock,
    title: "5. Data Retention",
    content: `Personal data is retained in accordance with the following schedule:

\u2022 Approved visa applications: Data retained for 90 days after visa expiry date, then permanently deleted
\u2022 Denied visa applications: Data retained for 12 months from the date of decision for appeal purposes
\u2022 Withdrawn applications: Data deleted within 30 days of withdrawal confirmation
\u2022 Payment records: Retained for 5 years as required by financial regulations of the Kyrgyz Republic
\u2022 Audit logs: Retained for 3 years for security and compliance purposes

After the retention period, all personal data is securely destroyed using certified data destruction methods.`,
  },
  {
    icon: UserCheck,
    title: "6. Your Rights",
    content: `As a data subject, you have the following rights:

\u2022 Right of access \u2014 request a copy of the personal data we hold about you
\u2022 Right to rectification \u2014 correct inaccurate or incomplete data before visa issuance
\u2022 Right to erasure \u2014 request deletion of your data (subject to legal retention requirements)
\u2022 Right to restriction \u2014 request that processing of your data be limited in certain circumstances
\u2022 Right to data portability \u2014 receive your data in a machine-readable format
\u2022 Right to object \u2014 object to processing based on legitimate interests

To exercise any of these rights, please submit a request through the contact details below. We will respond within 30 calendar days.`,
  },
  {
    icon: Mail,
    title: "7. Contact for Privacy Inquiries",
    content: `For questions, concerns, or requests regarding your personal data and this Privacy Policy:

Data Protection Officer
Ministry of Foreign Affairs of the Kyrgyz Republic
57 Erkindik Boulevard, Bishkek, 720040
Email: privacy@evisa.kg
Phone: +996 (312) 62-05-45

Response times: We aim to acknowledge all privacy inquiries within 2 business days and provide a substantive response within 30 calendar days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <div className="mx-auto flex items-center justify-center gap-2 mb-2">
          <Lock className="h-6 w-6 text-neutral-300" />
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">Privacy Policy</h1>
        <p className="mt-2 text-neutral-300 text-sm">
          How we collect, use, and protect your personal data
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <AnimateOnScroll variant="fadeIn">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 mb-6">
            <p className="text-neutral-600 leading-relaxed text-sm">
              The e-Visa Portal of the Kyrgyz Republic (&quot;we&quot;, &quot;our&quot;, &quot;the Portal&quot;) is
              committed to protecting the privacy and security of your personal
              data. This Privacy Policy explains how we collect, use, store, and
              safeguard information submitted through the electronic visa
              application system, in compliance with the Law of the Kyrgyz
              Republic on Personal Information (No. 58, 2008).
            </p>
            <p className="text-neutral-400 text-xs mt-4">
              Last updated: April 1, 2026 &middot; Effective date: April 15, 2026
            </p>
          </div>
        </AnimateOnScroll>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <AnimateOnScroll key={section.title} variant="fadeUp" delay={index * 0.05}>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gov-100">
                    <section.icon className="h-5 w-5 text-gov-600" />
                  </div>
                  <h2 className="text-lg font-bold text-neutral-900 pt-1.5">
                    {section.title}
                  </h2>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line pl-[52px]">
                  {section.content}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
