'use client';
import { useMemo, useState } from 'react';

type Message = { id:string; created_at:string; message_type:string; subject:string; full_name:string; email:string; phone:string; property_slug?:string|null; property_title?:string|null; source_page?:string|null; message_body:string; status:'new'|'in_progress'|'closed'; is_read:boolean; archived:boolean; metadata?:Record<string,unknown>|null };

export function MessagesCenter({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages); const [active, setActive] = useState<Message|undefined>();
  const [statusFilter,setStatusFilter]=useState('all'); const [typeFilter,setTypeFilter]=useState('all'); const [readFilter,setReadFilter]=useState('all'); const [query,setQuery]=useState('');
  const fetchMessages = async () => {
    const response = await fetch('/api/messages', { cache: 'no-store' });
    if (!response.ok) return;
    const payload = await response.json();
    const nextMessages = (payload.data ?? []) as Message[];
    setMessages(nextMessages);
    if (active) {
      const freshActive = nextMessages.find((item) => item.id === active.id);
      setActive(freshActive);
    }
  };
  const filtered = useMemo(()=>messages.filter(m=> (statusFilter==='all'||m.status===statusFilter) && (typeFilter==='all'||m.message_type===typeFilter) && (readFilter==='all'|| (readFilter==='read'?m.is_read:!m.is_read)) && [m.full_name,m.email,m.phone,m.subject,m.message_body].join(' ').toLowerCase().includes(query.toLowerCase())),[messages,statusFilter,typeFilter,readFilter,query]);
  const patch=async (id:string,payload:Record<string,unknown>)=>{const r=await fetch(`/api/messages/${id}`,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});if(!r.ok) return alert('Update failed'); await fetchMessages();};
  const del=async(id:string)=>{if(!confirm('Delete message?')) return; const r=await fetch(`/api/messages/${id}`,{method:'DELETE'}); if(!r.ok) return alert('Delete failed'); await fetchMessages();};
  return <div className='space-y-4'><div className='grid gap-2 sm:grid-cols-4'><input className='rounded border p-2 text-sm' placeholder='Search' value={query} onChange={e=>setQuery(e.target.value)}/><select className='rounded border p-2 text-sm' value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value='all'>All status</option><option value='new'>New</option><option value='in_progress'>In progress</option><option value='closed'>Closed</option></select><select className='rounded border p-2 text-sm' value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}><option value='all'>All types</option><option value='property_enquiry'>Property</option><option value='request_quote'>Quote</option><option value='contact_message'>Contact</option><option value='general_enquiry'>General</option></select><select className='rounded border p-2 text-sm' value={readFilter} onChange={e=>setReadFilter(e.target.value)}><option value='all'>All reads</option><option value='unread'>Unread</option><option value='read'>Read</option></select></div>
  <div className='grid gap-4 lg:grid-cols-[1fr_360px]'><div className='space-y-2'>{filtered.length===0 ? <p className='rounded border p-4 text-sm text-gray-600'>No messages found.</p> : filtered.map(m=><button key={m.id} onClick={()=>setActive(m)} className='w-full rounded border p-3 text-left'><div className='flex justify-between text-sm font-medium'><span>{m.subject}</span><span>{new Date(m.created_at).toLocaleDateString()}</span></div><p className='text-xs'>{m.full_name} · {m.email || 'No email'} · {m.phone || 'No phone'}</p><p className='text-xs'>Type: {m.message_type} · Status: {m.status} · {m.is_read ? 'Read' : 'Unread'} · {m.archived ? 'Archived' : 'Active'}</p><p className='mt-1 line-clamp-2 text-xs text-gray-700'>{m.message_body}</p></button>)}</div>
  <div className='rounded border p-4'>{active ? <div className='space-y-2 text-sm'><h3 className='font-semibold'>{active.subject}</h3><p>{active.message_body}</p><p>{active.full_name} · {active.email || 'No email'} · {active.phone || 'No phone'}</p><p>Type: {active.message_type}</p><p>Status: {active.status} · {active.is_read ? 'Read' : 'Unread'} · {active.archived ? 'Archived' : 'Active'}</p><div className='flex flex-wrap gap-2'><button onClick={()=>patch(active.id,{is_read:!active.is_read})} className='rounded border px-2 py-1'>{active.is_read?'Mark unread':'Mark read'}</button><button onClick={()=>patch(active.id,{archived:!active.archived})} className='rounded border px-2 py-1'>{active.archived?'Unarchive':'Archive'}</button><select className='rounded border px-2 py-1' value={active.status} onChange={e=>patch(active.id,{status:e.target.value})}><option value='new'>New</option><option value='in_progress'>In progress</option><option value='closed'>Closed</option></select><button onClick={()=>del(active.id)} className='rounded border px-2 py-1 text-red-700'>Delete</button></div></div> : 'Select a message'}</div></div></div>
}
