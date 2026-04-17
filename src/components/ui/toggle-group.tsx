"use client";

import { cn } from "@/lib/utils";

interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
  hasError?: boolean;
}

export function ToggleGroup({
  options,
  value,
  onChange,
  id,
  hasError,
}: ToggleGroupProps) {
  return (
    <div
      id={id}
      role="radiogroup"
      className={cn(
        "inline-flex rounded-lg border p-1 gap-1",
        hasError ? "border-red-300" : "border-neutral-200"
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-md px-5 py-2 text-sm font-medium transition-all duration-200",
            value === option.value
              ? "bg-gov-500 text-white shadow-sm"
              : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
