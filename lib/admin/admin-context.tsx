'use client';

import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { applyFeaturedLimit, clearFeaturedStatus } from '@/lib/admin/featured-properties';
import { initialArticles, initialSettings, initialTeamMembers } from '@/lib/mock/admin-seed';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import type { AdminArticle, AdminProperty, AdminSettings, AdminTeamMember } from '@/types/admin';

interface AdminContextValue {
  properties: AdminProperty[];
  articles: AdminArticle[];
  teamMembers: AdminTeamMember[];
  settings: AdminSettings;
  createProperty: (input: Omit<AdminProperty, 'id' | 'createdAt' | 'updatedAt' | 'featuredAt'>) => Promise<string | null>;
  updateProperty: (id: string, input: Omit<AdminProperty, 'id' | 'createdAt' | 'updatedAt' | 'featuredAt'>) => void;
  deleteProperty: (id: string) => void;
  togglePropertyPublished: (id: string) => void;
  togglePropertyFeatured: (id: string) => void;
  createArticle: (input: Omit<AdminArticle, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateArticle: (id: string, input: Omit<AdminArticle, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteArticle: (id: string) => void;
  toggleArticlePublished: (id: string) => void;
  createTeamMember: (input: Omit<AdminTeamMember, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateTeamMember: (id: string, input: Omit<AdminTeamMember, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteTeamMember: (id: string) => void;
  toggleTeamMemberPublished: (id: string) => void;
  updateSettings: (nextSettings: AdminSettings) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

const createId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

export function AdminProvider({ children }: PropsWithChildren) {
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [articles, setArticles] = useState<AdminArticle[]>(initialArticles);
  const [teamMembers, setTeamMembers] = useState<AdminTeamMember[]>(initialTeamMembers);
  const [settings, setSettings] = useState<AdminSettings>(initialSettings);

  useEffect(() => {
    const loadProperties = async () => {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) return;
      const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
      if (error) return;
      const mapped = (data ?? []).map((row: any) => ({
        id: String(row.id),
        title: row.title ?? '',
        slug: row.slug ?? '',
        purpose: row.purpose === 'rent' ? 'rent' : 'sale',
        propertyType: row.property_type ?? '',
        location: row.location ?? '',
        price: Number(row.price ?? 0),
        bedrooms: Number(row.bedrooms ?? 0),
        bathrooms: Number(row.bathrooms ?? 0),
        area: Number(row.area_size ?? 0),
        shortDescription: row.short_description ?? '',
        fullDescription: row.description ?? '',
        coverImage: row.cover_image_url ?? '',
        galleryImages: Array.isArray(row.gallery_image_urls) ? row.gallery_image_urls : [],
        featured: row.featured === true,
        published: row.published === true,
        createdAt: row.created_at ?? '',
        updatedAt: row.updated_at ?? '',
        featuredAt: row.featured_at ?? null,
      })) as AdminProperty[];
      setProperties(mapped);
    };
    void loadProperties();
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({
      properties,
      articles,
      teamMembers,
      settings,
      createProperty: async (input) => {
        const now = new Date().toISOString();
        const featuredAt = input.featured ? now : null;

        const supabase = createSupabaseBrowserClient();
        if (!supabase) {
          return null;
        }

        const { data, error } = await supabase.from('properties').insert({
          title: input.title,
          slug: input.slug,
          purpose: input.purpose,
          property_type: input.propertyType,
          location: input.location,
          price: input.price,
          bedrooms: input.bedrooms,
          bathrooms: input.bathrooms,
          area_size: input.area,
          short_description: input.shortDescription,
          description: input.fullDescription,
          cover_image_url: input.coverImage,
          gallery_image_urls: input.galleryImages,
          featured: input.featured,
          featured_at: featuredAt,
          published: input.published === true,
        }).select('*').single();

        if (error) {
          return null;
        }

        if (!data) return null;

        const id = String(data.id);
        let nextProperties: AdminProperty[] = [
          ...properties,
          {
            id,
            ...input,
            createdAt: now,
            updatedAt: now,
            featuredAt,
          },
        ];

        if (input.featured) {
          nextProperties = applyFeaturedLimit(nextProperties, id, now);
        }

        setProperties(nextProperties);
        console.info('[admin:properties] Supabase insert successful.', { slug: input.slug });
        return id;
      },
      updateProperty: (id, input) => {
        const now = new Date().toISOString();
        const supabase = createSupabaseBrowserClient();
        if (supabase) {
          void supabase.from('properties').update({
            title: input.title,
            slug: input.slug,
            purpose: input.purpose,
            property_type: input.propertyType,
            location: input.location,
            price: input.price,
            bedrooms: input.bedrooms,
            bathrooms: input.bathrooms,
            area_size: input.area,
            short_description: input.shortDescription,
            description: input.fullDescription,
            cover_image_url: input.coverImage,
            gallery_image_urls: input.galleryImages,
            featured: input.featured,
            published: input.published === true,
            updated_at: now,
          }).eq('id', id);
        }
        setProperties((current) => {
          const existing = current.find((property) => property.id === id);
          if (!existing) {
            return current;
          }

          let nextProperties = current.map((property) =>
            property.id === id
              ? {
                  ...property,
                  ...input,
                  updatedAt: now,
                  featuredAt: input.featured ? property.featuredAt ?? now : null,
                }
              : property
          );

          if (input.featured && !existing.featured) {
            nextProperties = applyFeaturedLimit(nextProperties, id, now);
          }

          if (!input.featured && existing.featured) {
            nextProperties = clearFeaturedStatus(nextProperties, id, now);
          }

          return nextProperties;
        });
      },
      deleteProperty: (id) => {
        const supabase = createSupabaseBrowserClient();
        if (supabase) {
          void supabase.from('properties').delete().eq('id', id);
        }
        setProperties((current) => current.filter((property) => property.id !== id));
      },
      togglePropertyPublished: (id) => {
        const now = new Date().toISOString();
        setProperties((current) =>
          current.map((property) => {
            if (property.id !== id) return property;
            const nextPublished = !property.published;
            const supabase = createSupabaseBrowserClient();
            if (supabase) {
              void supabase.from('properties').update({ published: nextPublished, updated_at: now }).eq('id', id);
            }
            return { ...property, published: nextPublished, updatedAt: now };
          })
        );
      },
      togglePropertyFeatured: (id) => {
        const now = new Date().toISOString();
        setProperties((current) => {
          const existing = current.find((property) => property.id === id);
          if (!existing) {
            return current;
          }

          if (existing.featured) {
            const supabase = createSupabaseBrowserClient();
            if (supabase) {
              void supabase.from('properties').update({ featured: false, featured_at: null, updated_at: now }).eq('id', id);
            }
            return clearFeaturedStatus(current, id, now);
          }

          const supabase = createSupabaseBrowserClient();
          if (supabase) {
            void supabase.from('properties').update({ featured: true, featured_at: now, updated_at: now }).eq('id', id);
          }
          return applyFeaturedLimit(current, id, now);
        });
      },
      createArticle: (input) => {
        const now = new Date().toISOString();
        const id = createId('art');
        setArticles((current) => [...current, { id, ...input, createdAt: now, updatedAt: now }]);
        return id;
      },
      updateArticle: (id, input) => {
        const now = new Date().toISOString();
        setArticles((current) =>
          current.map((article) => (article.id === id ? { ...article, ...input, updatedAt: now } : article))
        );
      },
      deleteArticle: (id) => {
        setArticles((current) => current.filter((article) => article.id !== id));
      },
      toggleArticlePublished: (id) => {
        const now = new Date().toISOString();
        setArticles((current) =>
          current.map((article) =>
            article.id === id ? { ...article, published: !article.published, updatedAt: now } : article
          )
        );
      },
      createTeamMember: (input) => {
        const now = new Date().toISOString();
        const id = createId('team');
        setTeamMembers((current) => [...current, { id, ...input, createdAt: now, updatedAt: now }]);
        return id;
      },
      updateTeamMember: (id, input) => {
        const now = new Date().toISOString();
        setTeamMembers((current) =>
          current.map((member) => (member.id === id ? { ...member, ...input, updatedAt: now } : member))
        );
      },
      deleteTeamMember: (id) => {
        setTeamMembers((current) => current.filter((member) => member.id !== id));
      },
      toggleTeamMemberPublished: (id) => {
        const now = new Date().toISOString();
        setTeamMembers((current) =>
          current.map((member) =>
            member.id === id ? { ...member, published: !member.published, updatedAt: now } : member
          )
        );
      },
      updateSettings: (nextSettings) => {
        setSettings(nextSettings);
      },
    }),
    [articles, properties, settings, teamMembers]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }

  return context;
}
