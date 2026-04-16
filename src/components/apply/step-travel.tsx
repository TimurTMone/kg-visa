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

export function StepTravel() {
  const t = useTranslations("apply.travel");
  const tApply = useTranslations("apply");
  const { state, dispatch, nextStep, prevStep } = useWizard();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelFormData>({
    resolver: zodResolver(travelSchema),
    defaultValues: state.travel as TravelFormData,
  });

  const onSubmit = (data: TravelFormData) => {
    dispatch({ type: "SET_TRAVEL", data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">{t("title")}</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="entryDate">{t("entryDate")} *</Label>
          <Input
            id="entryDate"
            type="date"
            {...register("entryDate")}
            aria-invalid={!!errors.entryDate}
          />
          {errors.entryDate && (
            <p className="text-xs text-error">{errors.entryDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="exitDate">{t("exitDate")} *</Label>
          <Input
            id="exitDate"
            type="date"
            {...register("exitDate")}
            aria-invalid={!!errors.exitDate}
          />
          {errors.exitDate && (
            <p className="text-xs text-error">{errors.exitDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">{t("purpose")} *</Label>
          <select
            id="purpose"
            {...register("purpose")}
            className="flex h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 shadow-sm focus:border-gov-500 focus:outline-none focus:ring-2 focus:ring-gov-500/20"
          >
            <option value="">{t("purpose")}</option>
            <option value="tourism">{t("purposes.tourism")}</option>
            <option value="business">{t("purposes.business")}</option>
            <option value="transit">{t("purposes.transit")}</option>
            <option value="groupTourism">{t("purposes.groupTourism")}</option>
          </select>
          {errors.purpose && (
            <p className="text-xs text-error">{errors.purpose.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="visaType">{t("visaType")} *</Label>
          <select
            id="visaType"
            {...register("visaType")}
            className="flex h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 shadow-sm focus:border-gov-500 focus:outline-none focus:ring-2 focus:ring-gov-500/20"
          >
            <option value="">Select visa type</option>
            <option value="tourist">Tourist (30 days) — $50</option>
            <option value="tourist90">Tourist Extended (90 days) — $70</option>
            <option value="business">Business (90 days) — $70</option>
            <option value="group">Group Tourist (30 days) — $40/person</option>
            <option value="transit">Transit (5 days) — $35</option>
          </select>
          {errors.visaType && (
            <p className="text-xs text-error">{errors.visaType.message}</p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="accommodation">{t("accommodation")} *</Label>
          <Input
            id="accommodation"
            {...register("accommodation")}
            placeholder="Hotel name, address in Bishkek/Issyk-Kul"
            aria-invalid={!!errors.accommodation}
          />
          {errors.accommodation && (
            <p className="text-xs text-error">
              {errors.accommodation.message}
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
