"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@i18n/navigation";
import { cn } from "@/lib/utils";

const locales = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
  { code: "ky", label: "KY", flag: "🇰🇬" },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelect(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => onSelect(l.code)}
          className={cn(
            "rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all duration-200",
            locale === l.code
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700"
          )}
          aria-label={`Switch to ${l.label}`}
          aria-current={locale === l.code ? "true" : undefined}
        >
          <span className="mr-1">{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  );
}
