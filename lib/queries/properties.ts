import { createSupabaseServerClient } from '@/lib/supabase/server';

type PropertyFilters = {
  location?: string;
  purpose?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  keyword?: string;
};

const isDev = process.env.NODE_ENV !== 'production';

function logError(scope: string, error: unknown) {
  if (isDev) {
    console.error(`[properties:${scope}]`, error);
  }
}

export async function getFeaturedProperties() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('featured_at', { ascending: false, nullsFirst: false })
    .order('updated_at', { ascending: false })
    .limit(3);

  if (error) {
    logError('getFeaturedProperties', error);
    return [];
  }

  return data ?? [];
}

export async function getProperties(filters: PropertyFilters = {}) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  let query = supabase.from('properties').select('*').eq('published', true).order('created_at', { ascending: false });

  if (filters.purpose) query = query.eq('purpose', filters.purpose);
  if (filters.propertyType) query = query.eq('property_type', filters.propertyType);
  if (filters.location) query = query.ilike('location', `%${filters.location}%`);
  if (typeof filters.minPrice === 'number') query = query.gte('price', filters.minPrice);
  if (typeof filters.maxPrice === 'number') query = query.lte('price', filters.maxPrice);
  if (typeof filters.bedrooms === 'number') query = query.eq('bedrooms', filters.bedrooms);
  if (filters.keyword) {
    const key = `%${filters.keyword}%`;
    query = query.or(`title.ilike.${key},location.ilike.${key},neighborhood.ilike.${key},short_description.ilike.${key}`);
  }

  const { data, error } = await query;
  if (error) {
    logError('getProperties', error);
    return [];
  }
  return data ?? [];
}

export async function getPropertyBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    logError('getPropertyBySlug', error);
    return null;
  }

  return data;
}
