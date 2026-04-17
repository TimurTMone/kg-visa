"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

// Country code → flag emoji
function countryFlag(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

interface Country {
  code: string;
  name: string;
}

interface CountryComboboxProps {
  countries: Country[];
  value: string;
  onChange: (code: string) => void;
  placeholder?: string;
  id?: string;
  hasError?: boolean;
}

export function CountryCombobox({
  countries,
  value,
  onChange,
  placeholder = "Search countries...",
  id,
  hasError,
}: CountryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = countries.find((c) => c.code === value);

  const filtered = query
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    : countries;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => {
          setOpen(!open);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm transition-colors",
          hasError
            ? "border-red-300 focus:ring-red-500"
            : "border-neutral-200 focus:ring-gov-500",
          "hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        )}
      >
        {selected ? (
          <span className="flex items-center gap-2">
            <span className="text-base leading-none">{countryFlag(selected.code)}</span>
            <span>{selected.name}</span>
          </span>
        ) : (
          <span className="text-neutral-400">{placeholder}</span>
        )}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-neutral-400 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full rounded-lg border border-neutral-200 bg-white shadow-xl"
          >
            <div className="flex items-center gap-2 border-b border-neutral-100 px-3 py-2">
              <Search className="h-4 w-4 text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
            </div>
            <div className="max-h-48 overflow-y-auto p-1">
              {filtered.length === 0 ? (
                <p className="px-3 py-2 text-sm text-neutral-400">No results</p>
              ) : (
                filtered.slice(0, 50).map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      onChange(country.code);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                      value === country.code
                        ? "bg-gov-50 text-gov-700 font-medium"
                        : "text-neutral-700 hover:bg-neutral-50"
                    )}
                  >
                    <span className="text-base leading-none">
                      {countryFlag(country.code)}
                    </span>
                    <span className="flex-1 text-left">{country.name}</span>
                    {value === country.code && (
                      <Check className="h-4 w-4 text-gov-500" />
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
