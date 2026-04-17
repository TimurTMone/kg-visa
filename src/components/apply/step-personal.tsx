"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalSchema, type PersonalFormData } from "@/lib/validators/personal";
import { useWizard } from "./wizard-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { ALL_COUNTRIES } from "@/lib/constants";
import { CountryCombobox } from "@/components/shared/country-combobox";
import { ToggleGroup } from "@/components/ui/toggle-group";

export function StepPersonal() {
  const t = useTranslations("apply.personal");
  const tApply = useTranslations("apply");
  const { state, dispatch, nextStep } = useWizard();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PersonalFormData>({
    resolver: zodResolver(personalSchema),
    defaultValues: state.personal as PersonalFormData,
  });

  const gender = watch("gender");
  const nationality = watch("nationality");

  const onSubmit = (data: PersonalFormData) => {
    dispatch({ type: "SET_PERSONAL", data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">{t("title")}</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t("firstName")} *</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <p className="text-xs text-error">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">{t("lastName")} *</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <p className="text-xs text-error">{errors.lastName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">{t("dateOfBirth")} *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...register("dateOfBirth")}
            aria-invalid={!!errors.dateOfBirth}
          />
          {errors.dateOfBirth && (
            <p className="text-xs text-error">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>{t("gender")} *</Label>
          <ToggleGroup
            options={[
              { value: "male", label: t("male") },
              { value: "female", label: t("female") },
            ]}
            value={gender || ""}
            onChange={(val) => setValue("gender", val as "male" | "female", { shouldValidate: true })}
            hasError={!!errors.gender}
          />
          {errors.gender && (
            <p className="text-xs text-error">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>{t("nationality")} *</Label>
          <CountryCombobox
            countries={ALL_COUNTRIES}
            value={nationality || ""}
            onChange={(code) => setValue("nationality", code, { shouldValidate: true })}
            placeholder={t("selectCountry")}
            hasError={!!errors.nationality}
          />
          {errors.nationality && (
            <p className="text-xs text-error">{errors.nationality.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t("phone")} *</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+1 (555) 000-0000"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-xs text-error">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="email">{t("email")} *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-error">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg">
          {tApply("next")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
