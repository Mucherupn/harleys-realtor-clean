import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import type { AdminSettings } from '@/types/admin';

const defaults: AdminSettings = { companyName:'Harleys Realtor', phone:'', email:'', address:'', heroImagePath:'/next.svg', footerSummary:'', socialLinks:{}, copyrightText:''};

export async function getSiteSettings(){const s=createSupabaseBrowserClient(); if(!s) throw new Error('Supabase not configured'); const {data,error}=await s.from('site_settings').select('*').order('updated_at',{ascending:false}).limit(1).maybeSingle(); if(error) throw error; if(!data){ const payload={key:'site_profile',value:defaults,updated_at:new Date().toISOString()}; const {data:inserted,error:ie}=await s.from('site_settings').insert(payload).select('*').single(); if(ie) throw ie; return {id:String(inserted.id),settings:inserted.value as AdminSettings}; } return {id:String(data.id),settings:(data.value??defaults) as AdminSettings};}
export async function updateSiteSettings(id:string,settings:AdminSettings){const s=createSupabaseBrowserClient(); if(!s) throw new Error('Supabase not configured'); const {error}=await s.from('site_settings').update({value:settings,updated_at:new Date().toISOString()}).eq('id',id); if(error) throw error;}
