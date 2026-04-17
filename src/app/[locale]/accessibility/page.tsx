"use client";

import { Eye, Keyboard, Monitor, AlertCircle, MessageSquare, Mail, CheckCircle } from "lucide-react";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

const sections = [
  {
    icon: CheckCircle,
    title: "1. Our Commitment",
    content: `The e-Visa Portal of the Kyrgyz Republic is committed to ensuring digital accessibility for all users, including persons with disabilities. We strive to provide an inclusive experience that enables all visitors to apply for electronic visas independently and efficiently.

Our accessibility goal is to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at the AA conformance level. These guidelines are developed by the World Wide Web Consortium (W3C) and define requirements for designers and developers to improve accessibility for people with a wide range of disabilities, including visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities.`,
  },
  {
    icon: Keyboard,
    title: "2. Keyboard Navigation",
    content: `The portal is designed to be fully navigable using a keyboard alone:

\u2022 All interactive elements (links, buttons, form fields) are reachable via the Tab key
\u2022 Form fields follow a logical tab order matching the visual layout
\u2022 Dropdown menus and modal dialogs can be operated using arrow keys and Escape
\u2022 Skip-to-content links are provided to bypass repeated navigation blocks
\u2022 Focus indicators are visible on all interactive elements to show current keyboard position
\u2022 Custom components (date pickers, file uploaders) support standard keyboard patterns

If you encounter any element that cannot be reached or operated via keyboard, please report it using the feedback mechanism below.`,
  },
  {
    icon: Monitor,
    title: "3. Screen Reader Support",
    content: `We have implemented the following measures to ensure compatibility with assistive technologies:

\u2022 All pages use semantic HTML5 elements (header, nav, main, footer) for clear document structure
\u2022 Form fields include associated labels and, where applicable, descriptive help text via aria-describedby
\u2022 Error messages in forms are programmatically associated with their respective fields
\u2022 Status updates (e.g., application submission confirmation) are announced via ARIA live regions
\u2022 All images and icons include appropriate alt text or are marked as decorative
\u2022 Data tables include proper headers and scope attributes
\u2022 Language attributes are set correctly to support screen reader pronunciation

Tested with: NVDA (Windows), VoiceOver (macOS/iOS), and TalkBack (Android).`,
  },
  {
    icon: AlertCircle,
    title: "4. Known Limitations",
    content: `Despite our best efforts, some areas of the portal may have limited accessibility:

\u2022 Passport photo upload: The drag-and-drop interface may require the use of the alternative file browser button for keyboard and screen reader users
\u2022 PDF visa documents: Downloaded e-Visa PDFs may not be fully tagged for screen reader navigation; a plain-text summary is provided alongside
\u2022 CAPTCHA verification: While we use an accessible CAPTCHA solution, some users may need to use the audio alternative
\u2022 Third-party payment gateway: The payment processing page is operated by our payment partner and may have its own accessibility limitations

We are actively working to address these limitations and welcome feedback on any barriers you encounter.`,
  },
  {
    icon: MessageSquare,
    title: "5. Feedback Mechanism",
    content: `We welcome your feedback on the accessibility of the e-Visa portal. If you experience any accessibility barriers or have suggestions for improvement:

\u2022 Use the accessibility feedback form available on the Contact page
\u2022 Describe the issue you encountered, including the page URL and the assistive technology used
\u2022 We will acknowledge your feedback within 2 business days
\u2022 We aim to resolve reported accessibility issues within 15 business days
\u2022 If a fix requires more time, we will provide an interim alternative and a timeline for resolution

All accessibility feedback is reviewed by our development team and tracked in our accessibility improvement backlog.`,
  },
  {
    icon: Mail,
    title: "6. Contact Information",
    content: `For accessibility-related inquiries or to request an alternative format for any portal content:

Accessibility Coordinator
Ministry of Foreign Affairs of the Kyrgyz Republic
57 Erkindik Boulevard, Bishkek, 720040
Email: accessibility@evisa.kg
Phone: +996 (312) 62-05-45

Alternative formats available upon request:
\u2022 Large print instructions for the application process
\u2022 Plain language summaries of all policy documents
\u2022 Telephone-assisted application submission for users unable to complete the online form

This accessibility statement was last reviewed on April 1, 2026.`,
  },
];

export default function AccessibilityPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <div className="mx-auto flex items-center justify-center gap-2 mb-2">
          <Eye className="h-6 w-6 text-neutral-300" />
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">Accessibility Statement</h1>
        <p className="mt-2 text-neutral-300 text-sm">
          Our commitment to an inclusive and accessible portal
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <AnimateOnScroll variant="fadeIn">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 mb-6">
            <p className="text-neutral-600 leading-relaxed text-sm">
              The Ministry of Foreign Affairs of the Kyrgyz Republic is dedicated to
              providing equal access to government services for all individuals. This
              Accessibility Statement outlines the measures we have taken to ensure the
              e-Visa portal is usable by the widest possible audience, regardless of
              ability or technology.
            </p>
            <p className="text-neutral-400 text-xs mt-4">
              Conformance target: WCAG 2.1 Level AA &middot; Last reviewed: April 1, 2026
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
