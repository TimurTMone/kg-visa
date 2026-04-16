"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@i18n/navigation";
import { Button } from "@/components/ui/button";
import { Globe, Search, ArrowRight } from "lucide-react";
import { ALL_COUNTRIES } from "@/lib/constants";

export function EligibilityTeaser() {
  const t = useTranslations("eligibility");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = query
    ? ALL_COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <section className="bg-gov-900 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
          <Globe className="h-8 w-8 text-white" />
        </div>

        <h2 className="text-3xl font-bold text-white">{t("title")}</h2>
        <p className="mt-3 text-neutral-300">{t("subtitle")}</p>

        <div className="relative mt-8">
          <div className="flex items-center gap-3 rounded-xl bg-white p-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected("");
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                placeholder={t("search")}
                className="w-full rounded-lg bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:bg-neutral-100"
              />

              {showDropdown && filtered.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-48 overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-xl">
                  {filtered.map((c) => (
                    <button
                      key={c.code}
                      onMouseDown={() => {
                        setQuery(c.name);
                        setSelected(c.code);
                        setShowDropdown(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={() => {
                if (selected) {
                  router.push(`/eligibility?country=${selected}`);
                } else {
                  router.push("/eligibility");
                }
              }}
              size="lg"
              className="shrink-0"
            >
              {t("check")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
