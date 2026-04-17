"use client";

import { Camera, Briefcase, Plane, Users, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VisaType, VisaPurpose } from "@/types/visa";

interface VisaOption {
  visaType: VisaType;
  purpose: VisaPurpose;
  icon: typeof Camera;
  name: string;
  duration: string;
  fee: string;
  color: string;
  borderColor: string;
  bgColor: string;
}

const VISA_OPTIONS: VisaOption[] = [
  {
    visaType: "tourist",
    purpose: "tourism",
    icon: Camera,
    name: "Tourism",
    duration: "30 days",
    fee: "$50",
    color: "text-primary-500",
    borderColor: "border-primary-400",
    bgColor: "bg-primary-50",
  },
  {
    visaType: "tourist90",
    purpose: "tourism",
    icon: Plane,
    name: "Extended Tourism",
    duration: "90 days",
    fee: "$70",
    color: "text-accent-600",
    borderColor: "border-accent-400",
    bgColor: "bg-accent-50",
  },
  {
    visaType: "business",
    purpose: "business",
    icon: Briefcase,
    name: "Business",
    duration: "90 days",
    fee: "$70",
    color: "text-gov-500",
    borderColor: "border-gov-400",
    bgColor: "bg-gov-50",
  },
  {
    visaType: "group",
    purpose: "groupTourism",
    icon: Users,
    name: "Group Tourism",
    duration: "30 days",
    fee: "$40/person",
    color: "text-green-600",
    borderColor: "border-green-400",
    bgColor: "bg-green-50",
  },
  {
    visaType: "transit",
    purpose: "transit",
    icon: Zap,
    name: "Transit",
    duration: "5 days",
    fee: "$35",
    color: "text-neutral-600",
    borderColor: "border-neutral-400",
    bgColor: "bg-neutral-50",
  },
];

interface VisaTypeCardsProps {
  selectedType: VisaType | string;
  onSelect: (visaType: VisaType, purpose: VisaPurpose) => void;
  hasError?: boolean;
}

export function VisaTypeCards({
  selectedType,
  onSelect,
  hasError,
}: VisaTypeCardsProps) {
  return (
    <div
      className={cn(
        "grid gap-3 sm:grid-cols-2",
        hasError && "rounded-lg ring-2 ring-red-200 p-1"
      )}
    >
      {VISA_OPTIONS.map((opt) => {
        const isSelected = selectedType === opt.visaType;
        return (
          <button
            key={opt.visaType}
            type="button"
            onClick={() => onSelect(opt.visaType, opt.purpose)}
            className={cn(
              "relative flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
              isSelected
                ? `${opt.borderColor} ${opt.bgColor} shadow-sm`
                : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm"
            )}
          >
            {/* Checkmark */}
            {isSelected && (
              <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-gov-500">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}

            {/* Icon */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                isSelected ? opt.bgColor : "bg-neutral-100"
              )}
            >
              <opt.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isSelected ? opt.color : "text-neutral-400"
                )}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2 pr-6">
                <span className="font-semibold text-neutral-900">
                  {opt.name}
                </span>
                <span className="text-sm font-bold text-neutral-900 whitespace-nowrap">
                  {opt.fee}
                </span>
              </div>
              <span className="text-xs text-neutral-500">
                Up to {opt.duration}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
