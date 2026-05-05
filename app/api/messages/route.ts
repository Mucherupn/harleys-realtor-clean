import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const messageTypes = ['property_enquiry', 'request_quote', 'contact_message', 'general_enquiry'] as const;

const requestSchema = z.object({
  messageType: z.enum(messageTypes),
  subject: z.string().trim().min(3).max(140).optional(),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160).optional().or(z.literal('')),
  phone: z.string().trim().min(7).max(20).optional().or(z.literal('')),
  propertySlug: z.string().trim().max(180).optional(),
  propertyTitle: z.string().trim().max(180).optional(),
  sourcePage: z.string().trim().max(240).optional(),
  messageBody: z.string().trim().min(10).max(2000),
  metadata: z.record(z.string(), z.unknown()).optional()
});

const devLog = (kind: 'validation' | 'supabase', detail: unknown) => {
  if (process.env.NODE_ENV !== 'development') return;
  console.error('[api/messages]', { route: 'api/messages', kind, detail });
};

export async function GET() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });

  const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
  if (error) {
    devLog('supabase', error.message);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    devLog('validation', parsed.error.flatten());
    return NextResponse.json({ error: 'Invalid message payload' }, { status: 400 });
  }

  if (!parsed.data.email && !parsed.data.phone) {
    devLog('validation', 'missing email and phone');
    return NextResponse.json({ error: 'Provide at least an email or phone number' }, { status: 400 });
  }

  const payload = {
    message_type: parsed.data.messageType,
    subject: parsed.data.subject ?? 'New message',
    full_name: parsed.data.fullName,
    email: parsed.data.email || null,
    phone: parsed.data.phone || null,
    property_slug: parsed.data.propertySlug ?? null,
    property_title: parsed.data.propertyTitle ?? null,
    source_page: parsed.data.sourcePage ?? null,
    message_body: parsed.data.messageBody,
    metadata: parsed.data.metadata ?? null
  };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });

  const { error } = await supabase.from('messages').insert(payload);
  if (error) {
    devLog('supabase', error.message);
    return NextResponse.json({ error: 'Unable to send message right now' }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
