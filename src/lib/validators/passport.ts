import { z } from "zod/v4";

export const passportSchema = z
  .object({
    number: z
      .string()
      .min(1, "Passport number is required")
      .max(20)
      .regex(/^[A-Z0-9]+$/i, "Invalid passport number format"),
    issueDate: z.string().min(1, "Issue date is required"),
    expiryDate: z.string().min(1, "Expiry date is required"),
    issuingCountry: z.string().min(1, "Issuing country is required"),
  })
  .refine(
    (data) => {
      if (!data.expiryDate) return true;
      const expiry = new Date(data.expiryDate);
      const sixMonths = new Date();
      sixMonths.setMonth(sixMonths.getMonth() + 6);
      return expiry > sixMonths;
    },
    {
      message: "Passport must be valid for at least 6 months from today",
      path: ["expiryDate"],
    }
  );

export type PassportFormData = z.infer<typeof passportSchema>;
