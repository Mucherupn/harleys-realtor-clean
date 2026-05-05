import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { inquirySchema } from '@/lib/validators/inquiry';
import { messageInsertSchema } from '@/lib/validators/message';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

  const payload = messageInsertSchema.parse({
    message_type: 'property_enquiry',
    subject: `Property enquiry: ${parsed.data.propertyTitle ?? parsed.data.propertySlug}`,
    full_name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    property_slug: parsed.data.propertySlug,
    property_title: parsed.data.propertyTitle,
    source_page: `/properties/${parsed.data.propertySlug}`,
    message_body: parsed.data.message
  });

  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  const { error } = await supabase.from('messages').insert(payload);
  if (error) return NextResponse.json({ error: 'Unable to submit message' }, { status: 500 });

  return NextResponse.json({ success: true });
}
