'use client';

import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import * as propertiesApi from '@/lib/admin/properties';
import * as articlesApi from '@/lib/admin/articles';
import * as teamApi from '@/lib/admin/team';
import * as settingsApi from '@/lib/admin/settings';
import type { AdminArticle, AdminProperty, AdminSettings, AdminTeamMember } from '@/types/admin';

interface AdminContextValue {
  properties: AdminProperty[]; articles: AdminArticle[]; teamMembers: AdminTeamMember[]; settings: AdminSettings;
  createProperty: (input: propertiesApi.PropertyInput) => Promise<string | null>; updateProperty: (id: string, input: propertiesApi.PropertyInput) => Promise<void>; deleteProperty: (id: string) => Promise<void>; togglePropertyPublished: (id: string) => Promise<void>; togglePropertyFeatured: (id: string) => Promise<void>;
  createArticle: (input: articlesApi.ArticleInput) => Promise<void>; updateArticle: (id: string, input: articlesApi.ArticleInput) => Promise<void>; deleteArticle: (id: string) => Promise<void>; toggleArticlePublished: (id: string) => Promise<void>;
  createTeamMember: (input: teamApi.TeamInput) => Promise<void>; updateTeamMember: (id: string, input: teamApi.TeamInput) => Promise<void>; deleteTeamMember: (id: string) => Promise<void>; toggleTeamMemberPublished: (id: string) => Promise<void>;
  updateSettings: (nextSettings: AdminSettings) => Promise<void>;
}
const AdminContext = createContext<AdminContextValue | null>(null);
export function AdminProvider({ children }: PropsWithChildren) {
  const [properties,setProperties]=useState<AdminProperty[]>([]); const [articles,setArticles]=useState<AdminArticle[]>([]); const [teamMembers,setTeamMembers]=useState<AdminTeamMember[]>([]); const [settings,setSettings]=useState<AdminSettings>({companyName:'Harleys Realtor',phone:'',email:'',address:'',heroImagePath:'/next.svg',footerSummary:'',socialLinks:{},copyrightText:''}); const [settingsId,setSettingsId]=useState<string>('');
  const reloadAll=async()=>{setProperties(await propertiesApi.listAdminProperties()); setArticles(await articlesApi.listAdminArticles()); setTeamMembers(await teamApi.listAdminTeamMembers()); const s=await settingsApi.getSiteSettings(); setSettings(s.settings); setSettingsId(s.id);};
  useEffect(()=>{void reloadAll();},[]);
  const value = useMemo<AdminContextValue>(() => ({
    properties, articles, teamMembers, settings,
    createProperty: async (input: propertiesApi.PropertyInput) => { const created = await propertiesApi.createProperty(input); await reloadAll(); return created.id; },
    updateProperty: async (id: string, input: propertiesApi.PropertyInput) => { await propertiesApi.updateProperty(id, input); await reloadAll(); },
    deleteProperty: async (id: string) => { await propertiesApi.deleteProperty(id); await reloadAll(); },
    togglePropertyPublished: async (id: string) => { const row = properties.find((p) => p.id === id); if (!row) return; await propertiesApi.togglePublished(id, !row.published); await reloadAll(); },
    togglePropertyFeatured: async (id: string) => { const row = properties.find((p) => p.id === id); if (!row) return; await propertiesApi.toggleFeatured(id, !row.featured); await reloadAll(); },
    createArticle: async (input: articlesApi.ArticleInput) => { await articlesApi.createArticle(input); await reloadAll(); },
    updateArticle: async (id: string, input: articlesApi.ArticleInput) => { await articlesApi.updateArticle(id, input); await reloadAll(); },
    deleteArticle: async (id: string) => { await articlesApi.deleteArticle(id); await reloadAll(); },
    toggleArticlePublished: async (id: string) => { const row = articles.find((a) => a.id === id); if (!row) return; await articlesApi.toggleArticlePublished(id, !row.published); await reloadAll(); },
    createTeamMember: async (input: teamApi.TeamInput) => { await teamApi.createTeamMember(input); await reloadAll(); },
    updateTeamMember: async (id: string, input: teamApi.TeamInput) => { await teamApi.updateTeamMember(id, input); await reloadAll(); },
    deleteTeamMember: async (id: string) => { await teamApi.deleteTeamMember(id); await reloadAll(); },
    toggleTeamMemberPublished: async (id: string) => { const row = teamMembers.find((m) => m.id === id); if (!row) return; await teamApi.toggleTeamMemberPublished(id, !row.published); await reloadAll(); },
    updateSettings: async (nextSettings: AdminSettings) => { if (!settingsId) return; await settingsApi.updateSiteSettings(settingsId, nextSettings); await reloadAll(); },
  }), [properties, articles, teamMembers, settings, settingsId]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
export function useAdmin(){const c=useContext(AdminContext); if(!c) throw new Error('useAdmin must be used within an AdminProvider'); return c;}
