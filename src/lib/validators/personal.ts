import { z } from "zod/v4";

export const personalSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"]),
  nationality: z.string().min(1, "Nationality is required"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number"),
});

export type PersonalFormData = z.infer<typeof personalSchema>;
