import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { messageUpdateSchema } from '@/lib/validators/message';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const parsed = messageUpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  const { data, error } = await supabase.from('messages').update(parsed.data).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  return NextResponse.json({ success: true });
}
