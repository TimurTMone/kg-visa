"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { travelSchema, type TravelFormData } from "@/lib/validators/travel";
import { useWizard } from "./wizard-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { VisaTypeCards } from "./visa-type-cards";
import type { VisaType, VisaPurpose } from "@/types/visa";

export function StepTravel() {
  const t = useTranslations("apply.travel");
  const tApply = useTranslations("apply");
  const { state, dispatch, nextStep, prevStep } = useWizard();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TravelFormData>({
    resolver: zodResolver(travelSchema),
    defaultValues: state.travel as TravelFormData,
  });

  const entryDate = watch("entryDate");
  const exitDate = watch("exitDate");
  const visaType = watch("visaType");

  const onSubmit = (data: TravelFormData) => {
    dispatch({ type: "SET_TRAVEL", data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">{t("title")}</h2>
      </div>

      {/* Travel Dates — single range picker */}
      <div className="space-y-2">
        <Label>Travel Dates *</Label>
        <DateRangePicker
          startDate={entryDate || ""}
          endDate={exitDate || ""}
          onStartChange={(d) => setValue("entryDate", d, { shouldValidate: true })}
          onEndChange={(d) => setValue("exitDate", d, { shouldValidate: true })}
          hasError={!!errors.entryDate || !!errors.exitDate}
        />
        {errors.entryDate && (
          <p className="text-xs text-error">{errors.entryDate.message}</p>
        )}
        {errors.exitDate && (
          <p className="text-xs text-error">{errors.exitDate.message}</p>
        )}
      </div>

      {/* Visa Type — card selection (replaces both purpose + visaType dropdowns) */}
      <div className="space-y-2">
        <Label>{t("visaType")} *</Label>
        <VisaTypeCards
          selectedType={visaType || ""}
          onSelect={(type: VisaType, purpose: VisaPurpose) => {
            setValue("visaType", type, { shouldValidate: true });
            setValue("purpose", purpose, { shouldValidate: true });
          }}
          hasError={!!errors.visaType}
        />
        {errors.visaType && (
          <p className="text-xs text-error">{errors.visaType.message}</p>
        )}
      </div>

      {/* Accommodation */}
      <div className="space-y-2">
        <Label htmlFor="accommodation">{t("accommodation")} *</Label>
        <Input
          id="accommodation"
          {...register("accommodation")}
          placeholder="Hotel name, address in Bishkek/Issyk-Kul"
          aria-invalid={!!errors.accommodation}
        />
        {errors.accommodation && (
          <p className="text-xs text-error">{errors.accommodation.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" size="lg" onClick={prevStep}>
          <ArrowLeft className="h-4 w-4" />
          {tApply("back")}
        </Button>
        <Button type="submit" size="lg">
          {tApply("next")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
