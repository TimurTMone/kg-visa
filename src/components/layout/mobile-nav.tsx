"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "./locale-switcher";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  const links = [
    { href: "/apply", label: t("apply") },
    { href: "/status", label: t("status") },
    { href: "/visa-types", label: t("visaTypes") },
    { href: "/eligibility", label: t("eligibility") },
    { href: "/faq", label: t("faq") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-t border-neutral-200 bg-white shadow-lg">
          <nav className="flex flex-col p-4" role="navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-primary-600"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-neutral-200 pt-4">
              <LocaleSwitcher />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
