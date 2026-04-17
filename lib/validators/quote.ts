import { z } from 'zod';

export const quoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  serviceType: z.string().min(2),
  propertyLocation: z.string().min(2),
  details: z.string().min(10)
});

export type QuoteInput = z.infer<typeof quoteSchema>;
