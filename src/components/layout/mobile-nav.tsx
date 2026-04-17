"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "./locale-switcher";
import { motion, AnimatePresence } from "framer-motion";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const tAuth = useTranslations("auth");

  const links = [
    { href: "/apply", label: t("apply") },
    { href: "/status", label: t("status") },
    { href: "/visa-types", label: t("visaTypes") },
    { href: "/eligibility", label: t("eligibility") },
    { href: "/faq", label: t("faq") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    { href: "/login", label: tAuth("login") },
  ];

  return (
    <div className="lg:hidden">
      <motion.button
        onClick={() => setOpen(!open)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100"
        aria-label="Toggle menu"
        aria-expanded={open}
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full z-50 border-t border-neutral-200 bg-white shadow-lg"
          >
            <nav className="flex flex-col p-4" role="navigation">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 border-t border-neutral-200 pt-4"
              >
                <LocaleSwitcher />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
