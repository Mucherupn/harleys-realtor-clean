'use client';

import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { applyFeaturedLimit, clearFeaturedStatus } from '@/lib/admin/featured-properties';
import { initialArticles, initialProperties, initialSettings, initialTeamMembers } from '@/lib/mock/admin-seed';
import type { AdminArticle, AdminProperty, AdminSettings, AdminTeamMember } from '@/types/admin';

interface AdminContextValue {
  properties: AdminProperty[];
  articles: AdminArticle[];
  teamMembers: AdminTeamMember[];
  settings: AdminSettings;
  createProperty: (input: Omit<AdminProperty, 'id' | 'createdAt' | 'updatedAt' | 'featuredAt'>) => string;
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
  const [properties, setProperties] = useState<AdminProperty[]>(initialProperties);
  const [articles, setArticles] = useState<AdminArticle[]>(initialArticles);
  const [teamMembers, setTeamMembers] = useState<AdminTeamMember[]>(initialTeamMembers);
  const [settings, setSettings] = useState<AdminSettings>(initialSettings);

  const value = useMemo<AdminContextValue>(
    () => ({
      properties,
      articles,
      teamMembers,
      settings,
      createProperty: (input) => {
        const now = new Date().toISOString();
        const id = createId('prop');
        let nextProperties: AdminProperty[] = [
          ...properties,
          {
            id,
            ...input,
            createdAt: now,
            updatedAt: now,
            featuredAt: input.featured ? now : null,
          },
        ];

        if (input.featured) {
          nextProperties = applyFeaturedLimit(nextProperties, id, now);
        }

        setProperties(nextProperties);
        return id;
      },
      updateProperty: (id, input) => {
        const now = new Date().toISOString();
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
        setProperties((current) => current.filter((property) => property.id !== id));
      },
      togglePropertyPublished: (id) => {
        const now = new Date().toISOString();
        setProperties((current) =>
          current.map((property) =>
            property.id === id ? { ...property, published: !property.published, updatedAt: now } : property
          )
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
            return clearFeaturedStatus(current, id, now);
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
