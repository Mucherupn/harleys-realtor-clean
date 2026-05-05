import { MessagesCenter } from '@/components/admin/messages-center';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function MessagesPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = supabase ? await supabase.from('messages').select('*').order('created_at', { ascending: false }) : { data: [] };
  return <MessagesCenter initialMessages={data ?? []} />;
}
