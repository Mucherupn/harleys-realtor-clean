import type { Agent } from "@/types/agent";
import type { FocusLocation } from "@/types/location";
import type { Post } from "@/types/post";
import type { Property } from "@/types/property";
import type { Service } from "@/types/service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  getFeaturedProperties,
  getProperties,
  getPropertyBySlug,
} from "./properties";

const isDev = process.env.NODE_ENV !== "production";

const isEmptyObject = (value: unknown) =>
  typeof value === "object" &&
  value !== null &&
  Object.keys(value as Record<string, unknown>).length === 0;

const logError = (scope: string, error: unknown) => {
  if (!isDev || !error || isEmptyObject(error)) return;

  console.error(`[public:${scope}]`, error);
};

const toProperty = (row: Record<string, any>): Property => ({
  id: String(row.id),
  slug: row.slug,
  title: row.title,
  location: row.location ?? "",
  price: Number(row.price ?? row.price_kes ?? 0),
  status: row.purpose === "rent" || row.status === "to-let" ? "to-let" : "for-sale",
  propertyType: row.property_type ?? row.propertyType ?? "Property",
  bedrooms: row.bedrooms ?? undefined,
  bathrooms: row.bathrooms ?? undefined,
  areaSqFt: row.area_size ?? row.area_sq_ft ?? undefined,
  summary: row.short_description ?? row.summary ?? "",
  features: Array.isArray(row.features) ? row.features : [],
  coverImage: row.cover_image_url ?? row.coverImage ?? "/images/property-placeholder.jpg",
});

export async function getFeaturedPropertiesPublic(): Promise<Property[]> {
  const rows = await getFeaturedProperties();
  return rows.map(toProperty);
}

export async function getPropertiesPublic(
  filters: Parameters<typeof getProperties>[0],
): Promise<Property[]> {
  const rows = await getProperties(filters);
  return rows.map(toProperty);
}

export async function getPropertyBySlugPublic(
  slug: string,
): Promise<Property | null> {
  const row = await getPropertyBySlug(slug);
  return row ? toProperty(row) : null;
}

export async function getPublishedArticles(): Promise<Post[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    logError("getPublishedArticles", error);
    return [];
  }

  return (data ?? []).map((row: Record<string, any>) => ({
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    category: row.category ?? "Insights",
    publishedAt: row.published_at ?? row.created_at ?? "",
    author: row.author_name ?? row.author ?? "Harleys Realtor",
  }));
}

export async function getArticleBySlug(slug: string): Promise<Post | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    logError("getArticleBySlug", error);
    return null;
  }

  if (!data) return null;

  return {
    id: String(data.id),
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt ?? "",
    content: data.content ?? "",
    category: data.category ?? "Insights",
    publishedAt: data.published_at ?? data.created_at ?? "",
    author: data.author_name ?? data.author ?? "Harleys Realtor",
  };
}

export async function getPublishedTeamMembers(): Promise<Agent[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    logError("getPublishedTeamMembers", error);
    return [];
  }

  return (data ?? []).map((row: Record<string, any>) => ({
    id: String(row.id),
    slug: row.slug ?? String(row.id),
    name: row.name ?? "",
    role: row.role ?? "",
    bio: row.bio ?? "",
    focus: row.focus ?? "",
    email: row.email ?? "",
    image: row.image_url ?? "",
  }));
}

export async function getPublishedServices(): Promise<Service[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    logError("getPublishedServices", error);
    return [];
  }

  return (data ?? [])
    .map((row: Record<string, any>) => ({
      slug: row.slug,
      title: row.title,
      description: row.description ?? row.excerpt ?? "",
      capabilities: Array.isArray(row.capabilities) ? row.capabilities : [],
      process: Array.isArray(row.process) ? row.process : [],
    }))
    .filter((row: Service) =>
      ["letting-and-sales", "property-management", "consultancy"].includes(
        row.slug,
      ),
    );
}

export async function getPublishedLocations(): Promise<FocusLocation[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    logError("getPublishedLocations", error);
    return [];
  }

  return (data ?? []).map((row: Record<string, any>) => ({
    name: row.name ?? "",
    summary: row.short_description ?? row.summary ?? "",
  }));
}