import { z } from 'zod';

const phoneRegex = /^[+()\-\s\d]{7,20}$/;

const cleanedString = (min: number, max: number) =>
  z.string().trim().min(min).max(max);

export const messageInsertSchema = z.object({
  message_type: z.enum(['property_enquiry', 'request_quote', 'contact_message', 'general_enquiry']),
  subject: cleanedString(3, 140),
  full_name: cleanedString(2, 120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(20).regex(phoneRegex, 'Invalid phone number format'),
  property_slug: z.string().trim().max(180).optional().nullable(),
  property_title: z.string().trim().max(180).optional().nullable(),
  source_page: z.string().trim().max(240).optional().nullable(),
  message_body: cleanedString(10, 2000),
  metadata: z.record(z.string(), z.unknown()).optional().nullable()
});

export const messageUpdateSchema = z.object({
  status: z.enum(['new', 'in_progress', 'closed']).optional(),
  is_read: z.boolean().optional(),
  archived: z.boolean().optional()
});
