"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ALL_COUNTRIES, getEligibility, VISA_FREE_COUNTRIES, EVISA_COUNTRIES } from "@/lib/constants";
import { Globe, CheckCircle2, FileText, Building2, ArrowRight, Search } from "lucide-react";

export default function EligibilityPage() {
  const t = useTranslations("eligibility");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = query
    ? ALL_COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : [];

  const result = selected ? getEligibility(selected) : null;
  const selectedCountry = ALL_COUNTRIES.find((c) => c.code === selected);

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-gov-900 py-8 text-center text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">{t("title")}</h1>
        <p className="mt-2 text-neutral-300 text-sm">{t("subtitle")}</p>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Search */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(null);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder={t("search")}
              className="w-full rounded-lg border border-neutral-300 bg-white py-3 pl-10 pr-4 text-sm text-neutral-900 outline-none focus:border-gov-500 focus:ring-2 focus:ring-gov-500/20"
            />

            {showDropdown && filtered.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-xl">
                {filtered.map((c) => (
                  <button
                    key={c.code}
                    onMouseDown={() => {
                      setQuery(c.name);
                      setSelected(c.code);
                      setShowDropdown(false);
                    }}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    <span>{c.name}</span>
                    <Badge
                      variant={
                        c.type === "visa-free"
                          ? "success"
                          : c.type === "e-visa"
                          ? "secondary"
                          : "warning"
                      }
                      className="text-xs"
                    >
                      {c.type === "visa-free" ? "Visa-Free" : c.type === "e-visa" ? "e-Visa" : "Embassy"}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        {result && selectedCountry && (
          <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            {result.type === "visa-free" && (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <Badge variant="success" className="mb-3">
                  {t("results.visaFree")}
                </Badge>
                <p className="text-neutral-600">
                  Citizens of <strong>{selectedCountry.name}</strong> can enter
                  Kyrgyzstan visa-free for up to{" "}
                  <strong>{result.days} days</strong>.
                </p>
              </div>
            )}

            {result.type === "e-visa" && (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <FileText className="h-8 w-8 text-gov-500" />
                </div>
                <Badge variant="secondary" className="mb-3">
                  {t("results.eVisa")}
                </Badge>
                <p className="text-neutral-600 mb-6">
                  Citizens of <strong>{selectedCountry.name}</strong> can apply
                  for an e-Visa online. Processing takes 3 business days.
                </p>
                <Button asChild>
                  <Link href="/apply">
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}

            {result.type === "embassy" && (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <Building2 className="h-8 w-8 text-amber-600" />
                </div>
                <Badge variant="warning" className="mb-3">
                  {t("results.embassy")}
                </Badge>
                <p className="text-neutral-600">
                  Citizens of <strong>{selectedCountry.name}</strong> need to
                  apply at a Kyrgyz embassy or consulate.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
