export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface BuildPropertySlugInput {
  title?: string;
  propertyType?: string;
  purpose?: string;
  location?: string;
  prefix?: string;
}

export function buildPropertySlug(input: BuildPropertySlugInput): string {
  const uniquePrefix = (input.prefix ?? Date.now().toString().slice(-6)).replace(/\D/g, '').slice(-6);
  const fallbackPrefix = uniquePrefix || Date.now().toString().slice(-6);

  const titleOrType = slugify(input.title || input.propertyType || 'property');
  const purpose = slugify(input.purpose || 'sale');
  const location = slugify(input.location || 'kenya');

  return `${fallbackPrefix}-${titleOrType}-for-${purpose}-in-${location}`;
}
