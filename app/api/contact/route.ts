import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { contactSchema } from '@/lib/validators/contact';
import { messageInsertSchema } from '@/lib/validators/message';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

  const payload = messageInsertSchema.parse({
    message_type: 'contact_message',
    subject: 'Contact form submission',
    full_name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    source_page: '/contact',
    message_body: parsed.data.message
  });

  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });

  const { error } = await supabase.from('messages').insert(payload);
  if (error) return NextResponse.json({ error: 'Unable to submit message' }, { status: 500 });

  return NextResponse.json({ success: true });
}
