"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passportSchema, type PassportFormData } from "@/lib/validators/passport";
import { useWizard } from "./wizard-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { ALL_COUNTRIES } from "@/lib/constants";
import { CountryCombobox } from "@/components/shared/country-combobox";

export function StepPassport() {
  const t = useTranslations("apply.passport");
  const tApply = useTranslations("apply");
  const { state, dispatch, nextStep, prevStep } = useWizard();

  // Pre-fill issuing country from nationality (Step 1)
  const defaultIssuingCountry = state.passport.issuingCountry || state.personal.nationality || "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PassportFormData>({
    resolver: zodResolver(passportSchema),
    defaultValues: {
      ...(state.passport as PassportFormData),
      issuingCountry: defaultIssuingCountry,
    },
  });

  const expiryDate = watch("expiryDate");
  const issuingCountry = watch("issuingCountry");

  // Smart expiry validation
  const expiryStatus = (() => {
    if (!expiryDate) return null;
    const expiry = new Date(expiryDate);
    const sixMonths = new Date();
    sixMonths.setMonth(sixMonths.getMonth() + 6);
    if (expiry < new Date()) return "expired";
    if (expiry < sixMonths) return "too-soon";
    return "valid";
  })();

  const onSubmit = (data: PassportFormData) => {
    dispatch({ type: "SET_PASSPORT", data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">{t("title")}</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="number">{t("number")} *</Label>
          <Input
            id="number"
            {...register("number")}
            placeholder="AB1234567"
            className="uppercase"
            aria-invalid={!!errors.number}
          />
          {errors.number && (
            <p className="text-xs text-error">{errors.number.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="issueDate">{t("issueDate")} *</Label>
          <Input
            id="issueDate"
            type="date"
            {...register("issueDate")}
            aria-invalid={!!errors.issueDate}
          />
          {errors.issueDate && (
            <p className="text-xs text-error">{errors.issueDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryDate">{t("expiryDate")} *</Label>
          <Input
            id="expiryDate"
            type="date"
            {...register("expiryDate")}
            aria-invalid={!!errors.expiryDate}
          />
          {/* Smart expiry feedback */}
          {expiryStatus === "valid" && (
            <p className="flex items-center gap-1 text-xs text-green-600">
              <CheckCircle2 className="h-3 w-3" />
              Valid for your trip
            </p>
          )}
          {expiryStatus === "too-soon" && (
            <p className="flex items-center gap-1 text-xs text-amber-600">
              <AlertTriangle className="h-3 w-3" />
              Passport must be valid for at least 6 months
            </p>
          )}
          {expiryStatus === "expired" && (
            <p className="flex items-center gap-1 text-xs text-red-600">
              <AlertTriangle className="h-3 w-3" />
              This passport has expired
            </p>
          )}
          {errors.expiryDate && (
            <p className="text-xs text-error">{errors.expiryDate.message}</p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label>{t("issuingCountry")} *</Label>
          <CountryCombobox
            countries={ALL_COUNTRIES}
            value={issuingCountry || ""}
            onChange={(code) => setValue("issuingCountry", code, { shouldValidate: true })}
            placeholder="Select issuing country"
            hasError={!!errors.issuingCountry}
          />
          {errors.issuingCountry && (
            <p className="text-xs text-error">{errors.issuingCountry.message}</p>
          )}
        </div>
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
