"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passportSchema, type PassportFormData } from "@/lib/validators/passport";
import { useWizard } from "./wizard-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";
import { ALL_COUNTRIES } from "@/lib/constants";

export function StepPassport() {
  const t = useTranslations("apply.passport");
  const tApply = useTranslations("apply");
  const { state, dispatch, nextStep, prevStep } = useWizard();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassportFormData>({
    resolver: zodResolver(passportSchema),
    defaultValues: state.passport as PassportFormData,
  });

  const onSubmit = (data: PassportFormData) => {
    dispatch({ type: "SET_PASSPORT", data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">{t("title")}</h2>
      </div>

      <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        {t("expiryWarning")}
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
          {errors.expiryDate && (
            <p className="text-xs text-error">{errors.expiryDate.message}</p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="issuingCountry">{t("issuingCountry")} *</Label>
          <select
            id="issuingCountry"
            {...register("issuingCountry")}
            className="flex h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 shadow-sm focus:border-gov-500 focus:outline-none focus:ring-2 focus:ring-gov-500/20"
          >
            <option value="">Select country</option>
            {ALL_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.issuingCountry && (
            <p className="text-xs text-error">
              {errors.issuingCountry.message}
            </p>
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
