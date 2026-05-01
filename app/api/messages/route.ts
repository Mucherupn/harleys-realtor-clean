import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  return NextResponse.json({ data });
}
