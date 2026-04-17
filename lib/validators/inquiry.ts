import { z } from 'zod';

export const inquirySchema = z.object({
  propertySlug: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  message: z.string().min(10)
});

export type InquiryInput = z.infer<typeof inquirySchema>;
