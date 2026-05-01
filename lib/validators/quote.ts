import { z } from 'zod';

export const quoteSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(20),
  serviceType: z.string().trim().min(2).max(100),
  propertyLocation: z.string().trim().min(2).max(160),
  details: z.string().trim().min(10).max(2000)
});

export type QuoteInput = z.infer<typeof quoteSchema>;
