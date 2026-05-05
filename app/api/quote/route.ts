import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { quoteSchema } from '@/lib/validators/quote';
import { messageInsertSchema } from '@/lib/validators/message';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

  const payload = messageInsertSchema.parse({
    message_type: 'request_quote',
    subject: `Quote request: ${parsed.data.serviceType}`,
    full_name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    source_page: '/request-quote',
    message_body: parsed.data.details,
    metadata: {
      service_type: parsed.data.serviceType,
      property_location: parsed.data.propertyLocation
    }
  });

  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  const { error } = await supabase.from('messages').insert(payload);
  if (error) return NextResponse.json({ error: 'Unable to submit message' }, { status: 500 });

  return NextResponse.json({ success: true });
}
