import { MessagesCenter } from '@/components/admin/messages-center';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export default async function MessagesPage() {
  const supabase = createSupabaseAdminClient();
  const { data } = supabase ? await supabase.from('messages').select('*').order('created_at', { ascending: false }) : { data: [] };
  return <MessagesCenter initialMessages={data ?? []} />;
}
