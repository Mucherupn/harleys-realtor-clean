import { z } from 'zod';

export const inquirySchema = z.object({
  propertySlug: z.string().trim().min(2).max(180),
  propertyTitle: z.string().trim().max(180).optional(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(20),
  message: z.string().trim().min(10).max(2000)
});

export type InquiryInput = z.infer<typeof inquirySchema>;
