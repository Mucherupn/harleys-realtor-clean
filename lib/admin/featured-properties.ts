import type { AdminProperty } from '@/types/admin';

const FEATURED_LIMIT = 3;

export function applyFeaturedLimit(
  properties: AdminProperty[],
  propertyId: string,
  nowIso: string = new Date().toISOString()
): AdminProperty[] {
  const nextProperties = [...properties];
  const targetIndex = nextProperties.findIndex((property) => property.id === propertyId);

  if (targetIndex === -1) {
    return nextProperties;
  }

  const target = nextProperties[targetIndex];
  if (target.featured) {
    return nextProperties;
  }

  const featuredProperties = nextProperties
    .filter((property) => property.featured && property.featuredAt)
    .sort((a, b) => new Date(a.featuredAt ?? 0).getTime() - new Date(b.featuredAt ?? 0).getTime());

  if (featuredProperties.length >= FEATURED_LIMIT) {
    const oldestFeatured = featuredProperties[0];
    const oldestFeaturedIndex = nextProperties.findIndex((property) => property.id === oldestFeatured.id);

    if (oldestFeaturedIndex !== -1) {
      nextProperties[oldestFeaturedIndex] = {
        ...nextProperties[oldestFeaturedIndex],
        featured: false,
        featuredAt: null,
        updatedAt: nowIso,
      };
    }
  }

  nextProperties[targetIndex] = {
    ...target,
    featured: true,
    featuredAt: nowIso,
    updatedAt: nowIso,
  };

  return nextProperties;
}

export function clearFeaturedStatus(properties: AdminProperty[], propertyId: string, nowIso: string = new Date().toISOString()) {
  return properties.map((property) =>
    property.id === propertyId
      ? {
          ...property,
          featured: false,
          featuredAt: null,
          updatedAt: nowIso,
        }
      : property
  );
}

export const featuredLimit = FEATURED_LIMIT;
