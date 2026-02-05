import { z } from "zod";

export const dogFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  gender: z.enum(["male", "female"], {
    message: "Gender is required",
  }),
  comment: z.string().max(500, "Comment must be less than 500 characters").optional(),
  lastSeenDate: z.string().min(1, "Date is required"),
  lastSeenTime: z.string().min(1, "Time is required"),
});

export type DogFormData = z.infer<typeof dogFormSchema>;

// Generate unique tag
export function generateTag(): string {
  const prefix = "CATAAA";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
