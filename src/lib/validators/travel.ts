import { z } from "zod/v4";

export const travelSchema = z
  .object({
    entryDate: z.string().min(1, "Entry date is required"),
    exitDate: z.string().min(1, "Exit date is required"),
    purpose: z.enum(["tourism", "business", "transit", "groupTourism"]),
    accommodation: z.string().min(1, "Accommodation address is required"),
    visaType: z.enum(["tourist", "tourist90", "business", "group", "transit"]),
  })
  .refine(
    (data) => {
      if (!data.entryDate || !data.exitDate) return true;
      return new Date(data.exitDate) > new Date(data.entryDate);
    },
    {
      message: "Exit date must be after entry date",
      path: ["exitDate"],
    }
  );

export type TravelFormData = z.infer<typeof travelSchema>;
