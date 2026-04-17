"use client";

import { FileText, UserCheck, AlertTriangle, CreditCard, Clock, Scale, Landmark, RefreshCw } from "lucide-react";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

const sections = [
  {
    icon: UserCheck,
    title: "1. Eligibility to Apply",
    content: `You may submit an e-Visa application through this portal if you meet all of the following criteria:

\u2022 You are a citizen of an eligible country as listed on the Visa Types page
\u2022 You hold a valid passport with at least 6 months of remaining validity from your intended date of entry
\u2022 You are not subject to any entry ban or deportation order from the Kyrgyz Republic
\u2022 You are at least 18 years of age, or a parent/legal guardian is submitting the application on your behalf
\u2022 Your purpose of travel falls within the permitted visa categories (tourism, business, medical, or transit)

The Ministry of Foreign Affairs reserves the right to refuse any application without obligation to provide reasons beyond those required by law.`,
  },
  {
    icon: AlertTriangle,
    title: "2. Accuracy of Information",
    content: `By submitting an application, you certify that:

\u2022 All information provided is true, accurate, and complete to the best of your knowledge
\u2022 All uploaded documents are genuine and unaltered
\u2022 You will promptly notify us of any changes to the information provided before visa issuance

Providing false, misleading, or fraudulent information constitutes a criminal offense under Article 351 of the Criminal Code of the Kyrgyz Republic and may result in:
\u2022 Immediate rejection of your application without refund
\u2022 Revocation of a previously issued e-Visa
\u2022 Prohibition from future applications for a period determined by the Ministry
\u2022 Referral to law enforcement authorities`,
  },
  {
    icon: CreditCard,
    title: "3. Fees & Refund Policy",
    content: `The following fee structure applies to all e-Visa applications:

\u2022 Single-entry visa (30 days): $50 USD
\u2022 Single-entry visa (60 days): $70 USD
\u2022 Multiple-entry visa (90 days): $120 USD
\u2022 Expedited processing surcharge: $30 USD

Refund policy:
\u2022 Full refund: If the portal experiences a confirmed technical failure preventing submission
\u2022 No refund: If your application is denied, as processing costs have already been incurred
\u2022 No refund: If you withdraw your application after it has entered the review queue
\u2022 Partial refund (expedited surcharge only): If expedited processing deadlines are not met

All fees are non-negotiable and subject to change with 30 days\u2019 advance notice posted on this portal. Payment is processed in USD; your bank may apply additional currency conversion fees.`,
  },
  {
    icon: Clock,
    title: "4. Processing Times",
    content: `Estimated processing times are as follows:

\u2022 Standard processing: Up to 3 business days from submission of a complete application
\u2022 Expedited processing: Up to 1 business day (subject to availability)
\u2022 Peak periods (June\u2013September): Processing may take up to 5 business days

These are estimates only and do not constitute guaranteed timelines. The Ministry of Foreign Affairs shall not be held liable for delays caused by:
\u2022 Incomplete or unclear documentation requiring additional verification
\u2022 Security screening processes mandated by national law
\u2022 Technical disruptions, system maintenance, or force majeure events
\u2022 High application volumes during peak travel seasons

Applicants are strongly advised to apply at least 15 days before their intended travel date.`,
  },
  {
    icon: Scale,
    title: "5. Limitation of Liability",
    content: `To the maximum extent permitted by law:

\u2022 The portal is provided on an \u201cas is\u201d and \u201cas available\u201d basis without warranties of any kind
\u2022 We do not guarantee uninterrupted or error-free operation of the portal
\u2022 We shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the portal or inability to use the portal
\u2022 Possession of an e-Visa does not guarantee entry into the Kyrgyz Republic; final admission decisions are made by border authorities at the point of entry
\u2022 We are not responsible for losses resulting from flight bookings, hotel reservations, or other travel arrangements made in anticipation of visa approval

Our total liability for any claim arising from use of this portal shall not exceed the visa application fee paid by the applicant.`,
  },
  {
    icon: Landmark,
    title: "6. Governing Law & Jurisdiction",
    content: `These Terms of Service are governed by and construed in accordance with the laws of the Kyrgyz Republic.

\u2022 Any disputes arising from these terms or your use of the portal shall be subject to the exclusive jurisdiction of the courts of the Kyrgyz Republic, located in Bishkek
\u2022 The application of the United Nations Convention on Contracts for the International Sale of Goods is expressly excluded
\u2022 If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect
\u2022 These terms constitute the entire agreement between you and the Ministry of Foreign Affairs regarding use of the e-Visa portal`,
  },
  {
    icon: RefreshCw,
    title: "7. Changes to These Terms",
    content: `The Ministry of Foreign Affairs reserves the right to modify these Terms of Service at any time:

\u2022 Material changes will be announced on the portal homepage at least 30 days before taking effect
\u2022 Changes to fees will be posted with at least 30 days\u2019 advance notice
\u2022 Your continued use of the portal after changes take effect constitutes acceptance of the updated terms
\u2022 We recommend reviewing these terms periodically to stay informed of updates

If you do not agree with any changes, you should discontinue use of the portal. Applications submitted before the effective date of changes will be governed by the terms in effect at the time of submission.`,
  },
];

export default function TermsPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <div className="mx-auto flex items-center justify-center gap-2 mb-2">
          <FileText className="h-6 w-6 text-neutral-300" />
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">Terms of Service</h1>
        <p className="mt-2 text-neutral-300 text-sm">
          Terms and conditions governing use of the e-Visa portal
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <AnimateOnScroll variant="fadeIn">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 mb-6">
            <p className="text-neutral-600 leading-relaxed text-sm">
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the
              electronic visa application portal of the Kyrgyz Republic (&quot;the Portal&quot;).
              By accessing the Portal or submitting a visa application, you agree to be
              bound by these Terms in their entirety. If you do not agree, you must not
              use the Portal.
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
